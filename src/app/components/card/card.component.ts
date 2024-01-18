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


  constructor(private apiService: BooksService){}

  //CardComponentで削除されたときに、BooksComponentが更新されるようにする
  deleteCard2(){
    this.apiService.delete(this.childCard.id_book).subscribe((resp: Respuesta) =>{
      console.log(resp);
      console.log('Libro eliminado');
      // 削除した本のidを親コンポーネントに通知 emit id de libro eliminado a padre
      this.deleteFromChild.emit(this.childCard.id_book);
    });
  }
}