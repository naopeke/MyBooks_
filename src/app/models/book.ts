export class Book {

    constructor(
        public id_book: number = 0,
        public id_user: number = 0,
        public title: string,
        public type: string,
        public author: string,
        public price: number,
        public photo: string,
        ) { }

        // public nombreCompleto():string{
        //     return this.name + " " + this.last_name;
        // }
}