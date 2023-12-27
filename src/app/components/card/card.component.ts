//子コンポーネント　：表示専用 child for display

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
//親コンポーネントから子コンポーネントに値を渡すときに使用
//親コンポーネントから値を受け取るためのプロパティを定義
//今回は、カードのインデックスを@Inputプロパティとして受け取る
//@Input プロパティ名:データ型;
  @Input() childCard: Book;
  @Input() isEven: boolean;
  @Input() index: number;

//子コンポーネントで発生した特定のイベント(例えば、ボタンのクリックなど)を親コンポーネントに通知するときに使用
//イベント通知とともに、子コンポーネントから親コンポーネントに値を渡す
//https://it-infomation.com/angular-output-decorator/
//今回は、イベントエミッターを通じてインデックスを送信
  @Output() deleteFromChild = new EventEmitter<number>();

  // dia 4
  // deleteCard(){
  //   this.deleteFromChild.emit(this.index);
  // }
  
  // dia 4
  // mandar id_book al padre "book.component.ts" para eliminar con id_book 
  // deleteCard(){
  //   this.deleteFromChild.emit(this.childCard.id_book);
  // }

  constructor(private booksService: BooksService){}

  //CardComponentで削除されたときに、BooksComponentが更新されるようにする
  deleteCard2(){
    this.booksService.delete(this.childCard.id_book);
    console.log('Book deleted');
    this.deleteFromChild.emit();
  }
}