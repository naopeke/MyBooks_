import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// https://angular.io/guide/observables

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url1 = "http://localhost:3000/book";
  private url2 = "http://localhost:3000/books";
  
  public book : Book;
  public books : Book[];

  constructor (private http: HttpClient) {}

  public getAll(id_user: number):Observable<Object>{
    let urlId = `${this.url2}?id_user=${id_user}`;
    return this.http.get(urlId);
  };

  public getOne(id_book: number, id_user: number):Observable<Object>{
    console.log(id_book);
    let urlId = `${this.url2}?id_user=${id_user}&id_book=${id_book}`;
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