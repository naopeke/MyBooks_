// 親コンポーネント　：本の追加や管理 parent : add and edit books

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';

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
  ) {  


    // get bookid from URL
    this.parametro = this.rutaActiva.snapshot.params.bookid;
    this.apiService.books = null;
  }

//Codigo Error salió para que usa  next, error, complete (Aunque he comprobado si funciona los ambos)
//'(next?: (value: Object) => void, error?: (error: any) => void, complete?: () => void): Subscription' is deprecated.ts(6385)
//Observable.d.ts(51, 9): The declaration was marked as deprecated here.
//(method) Observable<Object>.subscribe(next?: (value: Object) => void, error?: (error: any) => void, complete?: () => void): Subscription (+1 overload)
//@deprecated — Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments

//https://dev.to/barisbll/rxjs-7-observable-observer-and-subscription-37fk

  // mostrarTodosLosLibros(): void {
  //   this.apiService.getAll().subscribe((data: any) => {
  //     console.log('API Response:', data);
  //     this.books = data; 
  //     console.log('Books:', this.books); 
  //   }, error => {
  //     console.error('Error:', error);
  //   });
  // }

  // mostrarUnLibro(searchInput: string):void{
  //   if(searchInput === ''){
  //     this.apiService.getAll().subscribe((resp: Respuesta) =>{
  //       this.books = resp.data;
  //     });

  //   } else {
  //     let bookId = parseFloat(searchInput);
  //     this.apiService.getOne(bookId).subscribe((resp:Respuesta) =>{
  //       console.log(resp);
  //       if(resp.error){
  //         this.toastr.warning('No existe este codigo.', 'Error',
  //         {timeOut:2000, positionClass:'toast-top-center'});
  //       }
  //       else
  //         this.apiService.books = resp.data;
  //         this.router.navigate(['/books', bookId]);
  //     });
  //   }
  //   }

    // eliminarLibro(bookId: number): void {
  //   this.apiService.delete(bookId).subscribe((resp: Respuesta) => {
  //     console.log(resp);
  //     this.books = this.books.filter(book => book.id_book !== bookId);
  //     this.toastr.success('Libro eliminado correctamente', 'Success');
  //   }, error => {
  //     console.error('Error:', error);
  //     this.toastr.error('No se pudo eliminar el libro', 'Error');
  //   });
  // }

  // detalleLibro(): void {
  //   // Obtener bookId desde URL parametro (lo que nos enseñó José)
  //   // this.parametro = this.rutaActiva.snapshot.params.bookid;
  
  //   if (this.parametro) {
  //     let bookId = parseFloat(this.parametro);
  //     this.apiService.getOne(bookId).subscribe((resp: Respuesta) => {
  //       console.log("API Response:", resp);
  //       // data:Array [{...}] asi que hay que elegir data[0]↓
  //       this.bookDetail = resp.data[0];
  //       console.log("Book Detail:", this.bookDetail);
  //     });
  //   }
  // }


  mostrarTodosLosLibros(): void {
    this.apiService.getAll().subscribe({
      next: (data: any) => {
        console.log('API Response:', data);
        this.books = data; 
        console.log('Books:', this.books); 
      },
      error: error => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Completed')
      }
    });
    }


  mostrarUnLibro(searchInput: string):void{
    if(searchInput === ''){
      this.apiService.getAll().subscribe({
        next: (resp: Respuesta) =>{
          this.books = resp.data;
        },
        error: error => {
          console.error('Error:', error);
        }
      });

    } else {
      let bookId = parseFloat(searchInput);
      this.apiService.getOne(bookId).subscribe({
        next: (resp:Respuesta) =>{
          console.log(resp);
        // si no puede obtener id adecuado, warning
          if(resp.error){
            this.toastr.warning('No existe este codigo.', 'Error',
            {timeOut:2000, positionClass:'toast-top-center'});
          } else {
        // si ha podido obtener id
            this.apiService.books = resp.data;
            this.router.navigate(['/books'], { queryParams: { id: bookId } });
          }
        },
        error: error => {
          console.error(error);
        },
        complete: () => {
          console.log('Completed');
        }
    });
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
      const bookId = params['id'];
      if (bookId) {
        this.apiService.getOne(parseFloat(bookId)).subscribe({
          next: (resp: Respuesta) => {
            console.log("API Response:", resp);
            this.bookDetail = resp;
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
        console.log('No query param provided');
      }
    });
  }
  




  ngOnInit(): void {
    this.mostrarTodosLosLibros();
    this.detalleLibro();
  }
  
}