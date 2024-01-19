import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// https://angular.io/guide/observables
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url1 = "http://localhost:3000/book";
  private url2 = "http://localhost:3000/books";
  
  public book : Book;
  public books : Book[];

  constructor (private http: HttpClient) {
    this.books = [
      new Book(1, 'La Historia Interminable', 'Tapa dura', 'Michael Ende', 15.95, 'https://static.fnac-static.com/multimedia/Images/ES/NR/72/2e/12/1191538/1540-1.jpg'),
      new Book(2, 'Juego de tronos (Canción de hielo y fuego 1)', 'Tapa dura', 'George R. R. Martin', 27.90, 'https://static.fnac-static.com/multimedia/Images/ES/NR/57/56/80/8410711/1540-1.jpg'),
      new Book(3, 'Dragon Lance - Hoja del Destino', 'Tapa Dura', 'Margaret Weis / Tracy Hickman', 19.90, 'https://static.fnac-static.com/multimedia/Images/ES/NR/92/df/7c/8183698/1507-1.jpg'),
      new Book(4, 'Marvel. La enciclopedia', ' Tapa Dura', 'DK', 33.25, 'https://static.fnac-static.com/multimedia/Images/ES/NR/17/ab/53/5483287/1507-1.jpg'),
      new Book(5, 'Kochi Kochi! - La guía del viajero en Japón', 'Tapa Blanda', 'Satori', 19.95, 'https://static.fnac-static.com/multimedia/Images/ES/NR/83/69/4e/5138819/1507-1.jpg')
    ];

    // this.books = null;
  }

  // https://angular.io/guide/observables
  //https://codecraft.tv/courses/angular/http/http-with-observables/
  public getAll():Observable<Object>
  {
    return this.http.get(this.url2);
  };

  public getOne(id_book: number):Observable<Object>{
    console.log(id_book);
    return this.http.get(this.url2 + '/' + id_book);
  };

  //post
  public add(book: Book):Observable<Object>{
    console.log(book);
    return this.http.post(this.url2, book);
  };

  //put
  public edit(book:Book):Observable<Object>{
    console.log(book);
    return this.http.put(this.url2, book);
  };

  public delete(id:number):Observable<Object>{
    console.log(id);
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: id}
    return this.http.delete(this.url2, httpOptions);
  };
};