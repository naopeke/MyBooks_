//子コンポーネント　：表示専用 child for display

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() childCard: Book;
  @Input() isEven: boolean;
  @Input() index: number;

  @Output() deleteFromChild = new EventEmitter<number>();


  constructor(private apiService: BooksService){}


  deleteCard2(){
    this.apiService.delete(this.childCard.id_book).subscribe((resp: Respuesta) =>{
      console.log(resp);
      console.log('Libro eliminado');
      // 削除した本のidを親コンポーネントに通知 emit id de libro eliminado a padre
      this.deleteFromChild.emit(this.childCard.id_book);
    });
  }
}