import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';
import { Respuesta } from 'src/app/models/respuesta';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public user: User;

  constructor(private fromBuilder: FormBuilder,
              private apiService: UsersService,
              private toastr: ToastrService,
              private router: Router
              ){
    this.buildForm();
    this.user = new User();
  }

  public irBooks(){
    this.router.navigate(["/books"]);
  }

  public login(){
    let user = this.loginForm.value;
    console.log(user);

    this.apiService.login(user).subscribe({
      next: (resp: Respuesta) =>{
        console.log(resp);
        
        if(!resp.error){
          this.apiService.isLoginSubject.next(true);
          this.irBooks();
          this.toastr.success('Ya estás logueado', 'Success',
          {timeOut: 2000, positionClass:'toast-top-center'});
        } else {
          this.toastr.error('No has podido loguear. Intentalo de nuevo.','Error',
          {timeOut: 2000, positionClass:'toast-top-center'});
        }
      },
      error:(error)=>{
        console.log('No coinciden');
        console.error ('API error: ', error);
        if (error.status === 401){
          console.log('Correo o contraseña incorrectos');
          this.toastr.error('Correo o contraseña incorrectos.');
        } else {
          console.log('algún error');
          this.toastr.error('algo salió mal en autorización');
        }
        }
      })
    }
  

  private buildForm(){
    const minPassLength = 8;

    this.loginForm = this.fromBuilder.group({
      email: [, [ Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(minPassLength)]]
    });
  }

  ngOnInit(): void {
    
  }
}
