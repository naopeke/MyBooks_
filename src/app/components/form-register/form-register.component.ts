import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  [x: string]: any;
  public registerForm: FormGroup;

  constructor(private fromBuilder: FormBuilder){
    this.buildForm();
  }

  public register(){
    const user = this.registerForm.value;
    console.log(user);
  }

  private buildForm(){
    const minPassLength = 8;
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    // https://stackoverflow.com/questions/50508712/validate-an-url

    this.registerForm = this.fromBuilder.group({
      nombre: [, [Validators.required]],
      apellido: [, [Validators.required]],
      email: [, [ Validators.required, Validators.email]],
      url: [, [Validators.required, Validators.pattern(reg)]],
      password1: [, [Validators.required, Validators.minLength(minPassLength), this.createPasswordStrengthValidator()]],
      password2: [, [Validators.required, this.checkPasswords]]
  
    });
  }
  
  private checkPasswords(control: AbstractControl){
    let resultado = { matchPassword: true };
    //console.log(control.parent?value);
    if (control.parent?.value.password1 == control.value)
    resultado = null;

    return resultado;
  }

  //https://blog.angular-university.io/angular-custom-validators/
  private createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        console.log('Password Validation:', passwordValid);

        return !passwordValid ? {passwordStrength:true}: null;
    }
  }

  ngOnInit(): void {
    
  }
}

