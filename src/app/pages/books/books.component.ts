// 親コンポーネント　：本の追加や管理 parent : add and edit books

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public books: Book[];
  public bookId: string;
  public bookDetail: any;

  // A property for storing data retrieved from URL parameters
  public parametro: string;

  // for instance
  constructor(public  apiService: BooksService,
              private toastr: ToastrService,
              private router: Router,
              private rutaActiva: ActivatedRoute,
              public usersService: UsersService
  ) {  


    // get bookid from URL
    this.parametro = this.rutaActiva.snapshot.params.bookid;
    this.apiService.books = null;
  }


  mostrarTodosLosLibros(): void {
    const currentUser = this.usersService.getCurrentUser();
    if (currentUser && currentUser.id_user){

      this.apiService.getAll(currentUser.id_user).subscribe({
        next: (data: any) => {
          console.log('API Response:', data);
          this.books = data; 
          console.log('Books:', this.books); 

          this.router.navigate(['/books'], { queryParams: { id_user: currentUser.id_user }})
        },
        error: error => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Completed')
        }
      });
    } else {
      console.log('No está logueado');
    }
    }
  


  mostrarUnLibro(searchInput: string): void {
    const currentUser = this.usersService.getCurrentUser();
    if (currentUser && currentUser.id_user) {

      let bookId = parseFloat(searchInput);
    // si bookId es numero, 
      if (!isNaN(bookId)) { 
        this.apiService.getOne(bookId, currentUser.id_user).subscribe({
          next: (resp: Respuesta) => {
            console.log(resp);
            if (resp.error) {
              this.toastr.warning('No existe este codigo.', 'Error', { timeOut: 2000, positionClass: 'toast-top-center' });
            } else {
              this.bookDetail = resp[0];
              this.router.navigate(['/books'], { queryParams: { id_user: currentUser.id_user, id_book: bookId } });
            }
          },
          error: error => {
            console.error(error);
          },
          complete: () => {
            console.log('Completed');
          }
        });
      } else {
        // searchInput no es numero,
        this.toastr.warning('Book Id incorrecto.', 'Error', { timeOut: 2000, positionClass: 'toast-top-center' });
      }
    } else {
      console.log('No está logueado');
    }
  }
    

    
  eliminarLibro(bookId: number): void {
  this.apiService.delete(bookId).subscribe({
    next: (resp: Respuesta ) => {
      console.log(resp);
      this.books = this.books.filter(book => book.id_book !== bookId);
      this.toastr.success('Libro eliminado correctamente', 'Success');
    },
    error: error => {
      console.error('Error:', error);
      this.toastr.error('No se pudo eliminar el libro', 'Error');
    },
    complete: () => {
      console.log('Completed');
    }
  });
  }

  //para mostrar una tarjeta de getOne en una pagina de parametro 
  detalleLibro(): void {
    this.rutaActiva.queryParams.subscribe(params => {
      const bookId = params['id_book'];

      if (bookId) {
        // define currentUser como el dato guardado en usersService getCurrentUser
        const currentUser = this.usersService.getCurrentUser();
        if (currentUser && currentUser.id_user){
          this.apiService.getOne(bookId, currentUser.id_user).subscribe({
            next: (resp: Respuesta) => {
              console.log("API Response:", resp);
              this.bookDetail = resp[0];
              console.log("Book Detail:", this.bookDetail);
            },
            error: error => {
              console.error('Error:', error);
            },
            complete: () => {
              console.log('Completed');
            }
          });
        } else {
          console.log('No está logueado')
        }
       
      } else {
        console.log('Sin query param');
      }
    });
  }
  




  ngOnInit(): void {
    this.mostrarTodosLosLibros();
    this.detalleLibro();
  }
  
}