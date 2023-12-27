import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  
  constructor(public booksService: BooksService, 
              private router: Router){ }
  
  irBooks(){
    this.router.navigate(["/books"]);
  }
            

  //フォームの入力値を使用して新しいnewBookオブジェクトを作成し、booksServiceを通じて保存
  //bookId: string porque en add-book.component.html, saga como bookid.value (string)
  newBook(bookId:string, title:string, type:string, author:string, price:number, photo:string){
    // userID as a default
    let userID = 0;
    let bookIdIntoNumber = parseInt(bookId, 10);
    let newBook = new Book(bookIdIntoNumber, userID, title, type, author, price, photo);
    this.booksService.add(newBook);
    // console.log(this.booksService.books);
    this.irBooks();
  }

  ngOnInit(){ }

}



// public id_book: number = 0,
// public id_user: number = 0,
// public title: string,
// public type: string,
// public author: string,
// public price: number,
// public photo: string,