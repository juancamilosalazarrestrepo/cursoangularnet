import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  register: FormGroup;

  constructor(private fb: FormBuilder) {
    this.register = this.fb.group(
      {
        usuario: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: [''],
      },
      { validator: this.checkPassword }
    );
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  registrarUsuario(): void {
    console.log(this.register);
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;

    return pass === confirmPassword ? null : { notSame: true };
  }
}
