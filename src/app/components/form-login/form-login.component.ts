import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fromBuilder: FormBuilder){
    this.buildForm();
  }

  public register(){
    const user = this.loginForm.value;
    console.log(user);
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
