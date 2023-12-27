import { Injectable } from '@angular/core';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  public book:Book;
  // public books:Book[] = [];

  //hard coding
   private _books: Book[] = [
    new Book(1, 35, 'La Historia Interminable', 'Tapa dura', 'Michael Ende', 15.95, 'https://static.fnac-static.com/multimedia/Images/ES/NR/72/2e/12/1191538/1540-1.jpg'),
    new Book(2, 52, 'Juego de tronos (Canción de hielo y fuego 1)', 'Tapa dura', 'George R. R. Martin', 27.90, 'https://static.fnac-static.com/multimedia/Images/ES/NR/57/56/80/8410711/1540-1.jpg')
  ];

  constructor() { }
  
  public getAll():Book[]{
    return this._books;
  }

  public getOne(id_book:number):Book{
    // book.ts内でのpublic id_book: number = 0より
    //returnによりメソッドの外部でその値を使用できるようになる
    return this._books.find(book => book.id_book === id_book);
  };
  
  public add(book:Book):void {
    this._books.push(book);
  };

  public edit(book:Book): boolean{
    //buscar ids de todos los libros
    let ids = this._books.map(book => book.id_book);
    //buscar si existe este id
    let index = ids.indexOf(book.id_book);
    //si existe, renovar el dato de este libro
    if (index !== -1){
      this._books[index] = book;
      return true;
    }
    //si no, devolver false
    console.log('No se encuentra el libro con este id');
    return false;
  };


  public delete(id_book:number):boolean{
    //length desde el principio
    let length = this._books.length;
    // nuevo array sin los libros eliminados
    this._books = this._books.filter(book => book.id_book !== id_book);
    // devolver true si length ha cambiado
    if (this._books.length < length){
      return true;
    }
    return false;
  }

}
