import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  
  public message:string;

  currentUser: User | null = null;

  constructor(private apiService: BooksService,
              private toastr: ToastrService, 
              private router: Router,
              private usersService: UsersService
              ){
    this.message = null;
  }
  

  irBooks(){
    this.router.navigate(["/books"]);
  }
            

  insertarLibro(
    // codigoLibro:HTMLInputElement, 
    titulo:HTMLInputElement, tipo:HTMLInputElement, autor:HTMLInputElement, precio:HTMLInputElement, foto:HTMLInputElement){
    
    if (
      // codigoLibro.value == '' || 
      titulo.value == ''
        || tipo.value == ''
        || autor.value == ''
        || precio.value == ''
        || foto.value == '')
        this.toastr.error('Falta un campo obligatorio,', 'Error',
        {timeOut: 2000, positionClass:'toast-top-center'});
    else {
      // si currentUser.id_uer no es undefined(null), añadir id_user en bbdd
      let nuevoLibro: Book = new Book(
        titulo.value, 
        tipo.value, 
        autor.value, 
        parseFloat(precio.value), 
        foto.value,
        this.currentUser ? this.currentUser.id_user : undefined
      );
      console.log(nuevoLibro);

      this.apiService.add(nuevoLibro)
      .subscribe((resp:Respuesta) => {
      console.log(resp);

      if(!resp.error){
        this.irBooks();
        this.toastr.success('Libro agregado satisfactoriamente', 'Success',
        {timeOut: 2000, positionClass:'toast-top-center'});

        // codigoLibro.value = '';
        titulo.value = '';
        tipo.value = '';
        autor.value = '';
        precio.value = '';
        foto.value = '';
        this.apiService.book = null;
      } else
        this.toastr.error('El libro ya existe', 'Error',
        {timeOut: 2000, positionClass:'toast-top-center'});
    })
  }
  }


  ngOnInit():void{
    this.currentUser = this.usersService.getCurrentUser();
     }
  }
