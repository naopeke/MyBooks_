import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  // public books: Book[];
  // public book: Book;
  // public parametro: string;

  constructor(public booksService: BooksService, 
    private router: Router,
    private location: Location){ }

  updateBook(bookId:string, title:string, type:string, author:string, price:number, photo:string){
    // userID as a default
    let userID = 0;
    let bookIdIntoNumber = parseInt(bookId, 10);
    let updateBook = new Book(bookIdIntoNumber, userID, title, type, author, price, photo);
    this.booksService.edit(updateBook);
    this.irBooks();
  }
    
  irBooks(){
    this.router.navigate(["/books"]);
}

  goBack():void{
    this.location.back();
}
  
}
