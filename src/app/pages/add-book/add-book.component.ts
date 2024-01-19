import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  
  public message:string;

  constructor(private apiService: BooksService,
              private toastr: ToastrService, 
              private router: Router){
    this.message = null;
  }
  

  irBooks(){
    this.router.navigate(["/books"]);
  }
            

  insertarLibro(bookId:HTMLInputElement, title:HTMLInputElement, type:HTMLInputElement, author:HTMLInputElement, price:HTMLInputElement, photo:HTMLInputElement){
    
    if (bookId.value == ''
        || title.value == ''
        || type.value == ''
        || author.value == ''
        || price.value == ''
        || photo.value == '')
        this.toastr.error('Falta un campo obligatorio,', 'Error',
        {timeOut: 2000, positionClass:'toast-top-center'});
    else {
      let nuevoLibro: Book = new Book(parseFloat(bookId.value), title.value, type.value, author.value, parseFloat(price.value), photo.value)
      console.log(nuevoLibro);

      this.apiService.add(nuevoLibro)
      .subscribe((resp:Respuesta) => {
      console.log(resp);

      if(!resp.error){
        this.irBooks();
        this.toastr.success('Libro agregado satisfactoriamente', 'Success',
        {timeOut: 2000, positionClass:'toast-top-center'});

        bookId.value = '';
        title.value = '';
        type.value = '';
        author.value = '';
        price.value = '';
        photo.value = '';
        this.apiService.book = null;
      } else
        this.toastr.error('El libro ya existe', 'Error',
        {timeOut: 2000, positionClass:'toast-top-center'});
    })
  }
  }


  ngOnInit():void{
   }
  }
