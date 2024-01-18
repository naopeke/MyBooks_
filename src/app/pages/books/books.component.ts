// 親コンポーネント　：本の追加や管理 parent : add and edit books

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public books: Book[];

  //URLパラメータから取得したデータを格納するためのプロパティ
  public parametro: string;

  //依存性注入を利用してBooksService、Router、ActivatedRouteをインスタンス化
  constructor(public  apiService: BooksService,
              private toastr: ToastrService,
              private router: Router,
              private rutaActiva: ActivatedRoute,
  ) {  

    // URLから'bookid'パラメータを取得: /books/1の場合 this.parametroは1
    //https://angular.jp/start/start-routing
    //app.routing.module.ts内  {path: "add-book/:bookid", component:AddBookComponent},
    this.parametro = this.rutaActiva.snapshot.params.bookid;
    this.apiService.books = null;
    this.apiService.getAll().subscribe((resp:Respuesta) =>{
      console.log(resp);
      if(resp.error){
        this.toastr.warning('No hay ningún libro disponible', 'Error',
        {timeOut:2000, positionClass:'toast-top-center'});
      }
      else
        this.apiService.books = resp.data;
    })
  }

  // mostrarTodosLosLibro(){
  //   this.apiService.getAll().subscribe((resp:Respuesta) =>{
  //     console.log(resp);
  //     if(resp.error){
  //       this.toastr.warning('No hay ningún libro disponible', 'Error',
  //       {timeOut:2000, positionClass:'toast-top-center'});
  //     }
  //     else
  //       this.apiService.books = resp.data;
  //   })
  // }

  mostrarUnLibro(searchInputValue: string):void{
    let bookId = parseFloat(searchInputValue);
    this.apiService.getOne(bookId).subscribe((resp:Respuesta) =>{
      console.log(resp);
      if(resp.error){
        this.toastr.warning('No hay ningún libro disponible', 'Error',
        {timeOut:2000, positionClass:'toast-top-center'});
      }
      else
        this.apiService.books = resp.data;
    })
  }


  eliminarLibro(bookId: number):void{
    this.apiService.delete(bookId).subscribe((resp:Respuesta) =>{
      console.log(resp);
      if(resp.error){
        this.toastr.warning('No he podido eliminar', 'Error',
        {timeOut:2000, positionClass:'toast-top-center'});
      }
      else
        this.apiService.books = resp.data;
        this.toastr.success('Ha eliminado correctamente', 'Success',
        {timeOut:2000, positionClass:'toast-top-center'});
        this.refreshBooks();
    });
  }

  //削除された後にビューを更新。Books.component.htmlにdeteleFromChildをイベントバインド。 (bookDeleted)="refreshBooks()">
  //削除ボタンクリックで、ビューがリフレッシュされて更新される。
  refreshBooks(){
    this.apiService.getAll().subscribe((resp:Respuesta) =>{
      this.apiService.books = resp.data;
    });
  }


  //  ngOnInit(): void {
  //   this.apiService.getAll().subscribe((resp:Respuesta) =>{
  //     console.log(resp);
  //     console.log('Books:', this.books);
  //       this.books = resp.data;

  // })}


 
    ngOnInit(): void {
      this.apiService.getAll().subscribe((data: any) => {
        console.log('API Response:', data);
        this.books = data; // ここで配列を割り当て
        console.log('Books:', this.books); // 割り当て後の状態を確認
      }, error => {
        console.error('Error:', error);
      });
    }
    
  }
  