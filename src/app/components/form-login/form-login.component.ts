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
              ){
    this.buildForm();
    this.user = new User();
  }

  public login(){
    const user = this.loginForm.value;
    console.log(user);

    this.apiService.authentificate(user).subscribe({
      next: (resp: Respuesta) =>{
        console.log(resp);

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
