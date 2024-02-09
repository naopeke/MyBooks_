export class Book {

    constructor(
        public title: string,
        public type: string,
        public author: string,
        public price: number,
        public photo: string,
        public id_user?: number,
        public id_book?: number,
        ) { }

}