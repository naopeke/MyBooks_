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

  constructor (private http: HttpClient) {}

  // https://angular.io/guide/observables
  //https://codecraft.tv/courses/angular/http/http-with-observables/
  public getAll():Observable<Object>
  {
    return this.http.get(this.url2);
  };

  public getOne(id_book: number):Observable<Object>{
    console.log(id_book);
    let urlId = `${this.url2}?id=${id_book}`;
    return this.http.get(urlId);
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
    return this.http.delete(this.url2, {body: {id_book:id}})
  };
};