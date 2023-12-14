import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public myUser: User;
  public myClassCSS :string;
  public isHidden: boolean;

  constructor(){
    this.myUser = new User(1, 'John Ronald Reuel', 'Tolkien', 'jjtolkien@tolkien.org', 'https://i0.wp.com/elanillounico.com/wp-content/uploads/2015/03/JRR-Tolkien15.jpg?resize=723%2C1024&ssl=1', 'Gandulf1234');
    this.myClassCSS = "class1"
    this.isHidden = true;
  }

  public nombreCompleto():string{
    return this.myUser.nombreCompleto();
  }

  modificar(newName: HTMLInputElement, newLastName: HTMLInputElement, newEmail: HTMLInputElement, newPhoto: HTMLInputElement){
  
    // this.myUser.name = newName.value;
    // this.myUser.last_name = newLastName.value;
    // this.myUser.email = newEmail.value;
    // this.myUser.photo = newPhoto.value;
    // console.log(this.myUser.name);

    if (newName.value !== '') {
      this.myUser.name = newName.value;
    }
    if (newLastName.value !== '') {
      this.myUser.last_name = newLastName.value;
    }
    if (newEmail.value !== '') {
      this.myUser.email = newEmail.value;
    }
    if (newPhoto.value !== '') {
      this.myUser.photo = newPhoto.value;
    }
    this.isHidden = false;
    console.log(this.myUser.name);
  }

  // enviar(name: string, lastName: string, email: string, photo: string) {
  //   this.myUser.name = name;
  //   this.myUser.last_name = lastName;
  //   this.myUser.email = email;
  //   this.myUser.photo = photo;
  //   console.log('Updated user:', this.myUser);
  // }
  

  
  ngOnInit():void{

  }
}
