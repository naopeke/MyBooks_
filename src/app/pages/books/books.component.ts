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
  public bookId: string;
  public bookDetail: any;

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
  }

  mostrarTodosLosLibros(): void {
    this.apiService.getAll().subscribe((data: any) => {
      console.log('API Response:', data);
      this.books = data; 
      console.log('Books:', this.books); 
    }, error => {
      console.error('Error:', error);
    });
  }

  mostrarUnLibro(searchInput: string):void{
    // cuando search bar está vacio, muestra todos los libros.
    if(searchInput === ''){
      this.apiService.getAll().subscribe((resp: Respuesta) =>{
        this.books = resp.data;
      });
    } else {

      let bookId = parseFloat(searchInput);
      this.apiService.getOne(bookId).subscribe((resp:Respuesta) =>{
        console.log(resp);
        // si no puede obtener id adecuado, warning
        if(resp.error){
          this.toastr.warning('No existe este codigo.', 'Error',
          {timeOut:2000, positionClass:'toast-top-center'});
        }
        // si ha podido obtener id
        else
          this.apiService.books = resp.data;
          this.router.navigate(['/books', bookId]);
      });
    }
    }
  
  refresh():void {
    this.apiService.getAll().subscribe((data: Book[]) =>{
      this.books = data;
    })
  }

  // agregarLibro(newBook: Book):void{
  //   this.apiService.add(newBook).subscribe((resp:Respuesta) =>{
  //     console.log(resp);
  //     this.refresh();
  //   })
  // }


  eliminarLibro(bookId: number):void{
    this.apiService.delete(bookId).subscribe((resp:Respuesta) =>{
      console.log(resp);
      if(resp.error){
        this.toastr.warning('No he podido eliminar', 'Error',
        {timeOut:2000, positionClass:'toast-top-center'});
      }
      else
        this.apiService.books = resp.data;
        this.refresh();
        this.toastr.success('Ha eliminado correctamente', 'Success',
        {timeOut:2000, positionClass:'toast-top-center'});

    });
  }



  detalleLibro(): void {
    // Obtener bookId desde URL parametro (lo que nos enseñó José)
    this.parametro = this.rutaActiva.snapshot.params.bookid;
  
    if (this.parametro) {
      let bookId = parseFloat(this.parametro);
      this.apiService.getOne(bookId).subscribe((resp: Respuesta) => {
        console.log("API Response:", resp);
        // data:Array [{...}] asi que hay que elegir data[0]↓
        this.bookDetail = resp.data[0];
        console.log("Book Detail:", this.bookDetail);
      });
    }
  }
  




  ngOnInit(): void {
    this.mostrarTodosLosLibros();
    this.detalleLibro();
  }
  
}