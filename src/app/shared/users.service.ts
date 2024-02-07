import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = "http://localhost:3000";

  public user: User;

  constructor(private http: HttpClient) { }


  public register(user: User): Observable<any>{
    console.log(user);
    let registerUrl = this.url + '/register';
    return this.http.post(registerUrl, user);
  }
  
  public authentificate(user: User): Observable<any>{
    console.log(user);
    let loginUrl = this.url + '/login';
    return this.http.post(loginUrl, user);
  }

  
}


