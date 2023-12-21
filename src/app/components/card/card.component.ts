//子コンポーネント　：表示専用 child for display

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';

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

  deleteCard(){
    this.deleteFromChild.emit(this.index);
  }
  
}