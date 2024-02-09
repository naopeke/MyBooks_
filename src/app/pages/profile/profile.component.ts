import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 // null : el caso de no está logueado
  public myUser: User | null;
  public myClassCSS :string;
  public isHidden: boolean;

  constructor(
    private toastr: ToastrService,
    private usersService :UsersService,
    private http: HttpClient
  ){
    this.isHidden = true;
  }

  public nombreCompleto():string{
    return this.myUser.nombreCompleto();
  }




  modificar(newName: HTMLInputElement, newLastName: HTMLInputElement, newEmail: HTMLInputElement, newPhoto: HTMLInputElement){
    const currentUser = this.usersService.getCurrentUser();

  // si no es null currentUser ( está logueado ), new User
  if (currentUser && currentUser.id_user){
    let updatedUser = new User (currentUser.id_user, newName.value, newLastName.value, newEmail.value, newPhoto.value, currentUser.password);
    console.log(updatedUser);
  
    this.usersService.edit(updatedUser).subscribe((resp:Respuesta) =>{
      console.log(resp);
    if (resp.error)
    {
      this.toastr.warning('El usuario no existe.', 'Error',
      {timeOut:2000, positionClass:'toast-top-center'});
    }
    else
      this.usersService.user = resp[0];
      this.toastr.success('usuario modificado satisfactoriamente.', 'Success',
      {timeOut:2000, positionClass:'toast-top-center'});
  });
  } else {
    this.toastr.error('Lo está logueado.', 'Error',
    {timeOut:2000, positionClass:'toast-top-center'});
  }

   
}
  
    
  ngOnInit():void{
    // get dato del logueado y update myUser para mostrar en form-left en perfil
    const currentUserData = this.usersService.getCurrentUser();
    if (currentUserData) {
    this.myUser = new User(currentUserData.id_user, currentUserData.name, currentUserData.last_name, currentUserData.email, currentUserData.photo, currentUserData.password);
    }
}
}
