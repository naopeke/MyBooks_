import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private apiService: UsersService){}

  // usando BehaviorsSubject(isLoginSubject), obtiner el dato de login
  get isAuthenticated():boolean{
    return this.apiService.isLoginSubject.getValue();
  }


}
