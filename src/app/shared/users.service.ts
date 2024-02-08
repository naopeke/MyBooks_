import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "http://localhost:3000";

  public user: User;

  // https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243
  public isLoginSubject = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }


  public register(user: User): Observable<any>{
    console.log(user);
    const registerUrl = this.url + '/register';
    return this.http.post(registerUrl, user);
  }
  
  public login(user: User): Observable<any>{
    console.log(user);
    const loginUrl = this.url + '/login';
    return this.http.post(loginUrl, user);
  }

  public isLoggedIn():Observable<boolean>{
    return this.isLoginSubject.asObservable();
  }

  public logout(){
    this.isLoginSubject.next(false);
  }



  
}


