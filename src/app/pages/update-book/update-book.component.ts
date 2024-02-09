import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  public books: Book[];
 

  constructor(public apiService: BooksService, 
              private router: Router,
              private toastr: ToastrService,
              private usersService: UsersService
              ){ }

  modificarLibro(codigoLibro:HTMLInputElement, titulo:HTMLInputElement, tipo:HTMLInputElement, autor:HTMLInputElement, precio:HTMLInputElement, foto:HTMLInputElement){
    const currentUser = this.usersService.getCurrentUser();

    // si no es null currentUser ( está logueado ), new Book
    if (currentUser && currentUser.id_user){
      let updatedBook = new Book(titulo.value, tipo.value, autor.value, parseFloat(precio.value), foto.value, currentUser.id_user, parseFloat(codigoLibro.value));
      console.log(updatedBook);
    
      this.apiService.edit(updatedBook).subscribe((resp:Respuesta) =>{
        console.log(resp);
      if (resp.error)
      {
        this.toastr.warning('El libro no existe.', 'Error',
        {timeOut:2000, positionClass:'toast-top-center'});
      }
      else
        this.irBooks();
        this.apiService.books = resp.data;
        this.toastr.success('Libro modificado satisfactoriamente.', 'Success',
        {timeOut:2000, positionClass:'toast-top-center'});
    });
    } else {
      this.toastr.error('Lo está logueado.', 'Error',
      {timeOut:2000, positionClass:'toast-top-center'});
    }
  
     
  }
    
  irBooks(){
    this.router.navigate(["/books"]);
}

ngOnInit():void{ }

}
