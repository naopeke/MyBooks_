import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  // public myBook:Book;
  public books: Book[];

  constructor() {
    // this.myBook = new Book(1, 35, 'La Historia Interminable,', 'Tapa dura', 'Michael Ende', 15.95, 'https://static.fnac-static.com/multimedia/Images/ES/NR/72/2e/12/1191538/1540-1.jpg')

    // this.books = [
    //   new Book(1, 35, 'La Historia Interminable', 'Tapa dura', 'Michael Ende', 15.95, 'https://static.fnac-static.com/multimedia/Images/ES/NR/72/2e/12/1191538/1540-1.jpg'),
    //   new Book(2, 52, 'Juego de tronos (Canción de hielo y fuego 1) ', 'Tapa dura', 'George R. R. Martin ', 27.90, 'https://static.fnac-static.com/multimedia/Images/ES/NR/57/56/80/8410711/1540-1.jpg')
    // ]

    this.books = []
  }

  addBooks(bookId: HTMLInputElement, titulo: HTMLInputElement, tipo: HTMLInputElement,  autor: HTMLInputElement, precio: HTMLInputElement, foto: HTMLInputElement): void {
    let nuevoLibro = new Book(
      parseFloat(bookId.value),
      0,
      titulo.value,
      tipo.value,
      autor.value,
      parseFloat(precio.value),
      foto.value
    );

    if(nuevoLibro){
      this.books.push(nuevoLibro);
    }

  //vaciar el formulario
    bookId.value = "";
    titulo.value = "";
    tipo.value = "";
    autor.value = "";
    precio.value = "";
    foto.value = "";
  }

  ngOnInit(): void {

  }

}

