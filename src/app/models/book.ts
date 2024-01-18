export class Book {

    constructor(
        public id_book: number = 0,
        public title: string,
        public type: string,
        public author: string,
        public price: number,
        public photo: string,
        public id_user?: number
        ) { }

}