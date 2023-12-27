// 親コンポーネント　：本の追加や管理 parent : add and edit books

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  // public myBook:Book;
  public books: Book[];
  public book: Book;

  //URLパラメータから取得したデータを格納するためのプロパティ
  public parametro: string;

  //依存性注入を利用してBooksService、Router、ActivatedRouteをインスタンス化
  constructor(public booksService: BooksService,
              private router: Router,
              private rutaActiva: ActivatedRoute,
              private location: Location) {  

    // URLから'bookid'パラメータを取得: /books/1の場合 this.parametroは1
    //https://angular.jp/start/start-routing
    //app.routing.module.ts内  {path: "add-book/:bookid", component:AddBookComponent},
    this.parametro = this.rutaActiva.snapshot.params.bookid;
  }



  filterBooks(searchParam: string): void {
    const bookId = parseInt(searchParam, 10);
    if (!isNaN(bookId)) {
      let book = this.booksService.getOne(bookId);
      if (book) {
        this.router.navigate(['/books', bookId]);
      } else {
        console.log('No hay datos');
        this.books = this.booksService.getAll();
      }
    } else {
      console.log('Este ID no es válido');
      this.books = this.booksService.getAll();
    }
  }
  
  filterBooksOnInit(): void {
    this.parametro = this.rutaActiva.snapshot.params.bookid;
    if (this.parametro) {
      const bookId = parseInt(this.parametro, 10);
      if (!isNaN(bookId)) {
        this.book = this.booksService.getOne(bookId);
      } else {
        this.books = this.booksService.getAll();
      }
    } else {
      this.books = this.booksService.getAll();
    }
  }

  deleteBook(bookId: number):void{
    this.booksService.delete(bookId);
    this.refreshBooks();
  }

  //削除された後にビューを更新。Books.component.htmlにdeteleFromChildをイベントバインド。 (bookDeleted)="refreshBooks()">
  //削除ボタンクリックで、ビューがリフレッシュされて更新される。
  refreshBooks(){
    this.books = this.booksService.getAll();
  }

  goBack():void{
    this.location.back();
  }

  //cuando hace load de BooksComponent, obtener la ultima lista
   ngOnInit(): void {
    this.books = this.booksService.getAll();
    console.log(this.books);
    this.filterBooksOnInit();
  }
}



  //dia3
  // constructor() {
  //   // this.myBook = new Book(1, 35, 'La Historia Interminable,', 'Tapa dura', 'Michael Ende', 15.95, 'https://static.fnac-static.com/multimedia/Images/ES/NR/72/2e/12/1191538/1540-1.jpg')

  //   // this.books = [
  //   //   new Book(1, 35, 'La Historia Interminable', 'Tapa dura', 'Michael Ende', 15.95, 'https://static.fnac-static.com/multimedia/Images/ES/NR/72/2e/12/1191538/1540-1.jpg'),
  //   //   new Book(2, 52, 'Juego de tronos (Canción de hielo y fuego 1) ', 'Tapa dura', 'George R. R. Martin ', 27.90, 'https://static.fnac-static.com/multimedia/Images/ES/NR/57/56/80/8410711/1540-1.jpg')
  //   // ]

  //   this.books = []
  // }

  // DIA 4
  // public addBooks(bookId: HTMLInputElement, titulo: HTMLInputElement, tipo: HTMLInputElement,  autor: HTMLInputElement, precio: HTMLInputElement, foto: HTMLInputElement): void {
  //   let nuevoLibro = new Book(
  //     parseFloat(bookId.value),
  //     0,
  //     titulo.value,
  //     tipo.value,
  //     autor.value,
  //     parseFloat(precio.value),
  //     foto.value
  //   );

  //   if(nuevoLibro){
  //     this.books.push(nuevoLibro);
  //   }

  // //vaciar el formulario
  //   bookId.value = "";
  //   titulo.value = "";
  //   tipo.value = "";
  //   autor.value = "";
  //   precio.value = "";
  //   foto.value = "";
  // }

  // //インデックスが indexToRemove と等しくない場合、コールバック関数は true を返すため、これにより、指定されたインデックスの要素を除外した新しい配列が生成される
  // //filtrar los libros que no es este index
  // // public deleteBook(removingIndex:number){
  // //   this.books = this.books.filter((book, index) => index !== removingIndex)
  // // }

  // deleteBook(index: number) {
  //   this.books.splice(index, 1);}

  // ngOnInit(): void {

  // }

// }

