import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{

  private url = "http://localhost:3000";

  public user: User;

  // https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243
  // si está logueado (true) o no (false)
  public isLoginSubject = new BehaviorSubject<boolean>(false);

  // guarda info de users
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) { }


  public register(user: User): Observable<any>{
    console.log(user);
    const registerUrl = this.url + '/register';
    return this.http.post(registerUrl, user);
  }
  

  // tap para logging https://piyush132000.medium.com/mastering-the-rxjs-tap-operator-in-angular-real-life-examples-776ba8bedf15
  public login(user: User): Observable<any>{
    console.log(user);
    const loginUrl = this.url + '/login';
    return this.http.post(loginUrl, user).pipe(
      tap((resp: any) => {
        if (resp && resp.id_user){
          // si se coincide id_user, isLoginSubject (true) y update currentUserSubject (resp)
          this.isLoginSubject.next(true);
          this.currentUserSubject.next(resp);
        }
      })
    )
  }

  public isLoggedIn():Observable<boolean>{
    return this.isLoginSubject.asObservable();
  }

  public logout(){
    // borrar info de currentUser
    this.currentUserSubject.next(null);
    // log in false
    this.isLoginSubject.next(false);
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }



  public edit(user: User): Observable<any>{
    console.log(user);
    const editProfileUrl = this.url + '/profile';
    return this.http.put(editProfileUrl, user)
  }




  ngOnInit(): void {
      
  }
  
}


