import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css'],
})
export class CambiarPasswordComponent {
  cambiarPassword: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cambiarPassword = this.fb.group(
      {
        passwordAnterior: ['', Validators.required],
        nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: [''],
      },
      { validator: this.checkPassword }
    );
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['nuevaPassword'].value;
    const confirmPassword = group.controls['confirmPassword'].value;
    console.log('pass', pass, 'confirm', confirmPassword);
    return pass === confirmPassword ? null : { notSame: true };
  }

  guardarPassword(): void {
    console.log(this.cambiarPassword);
  }
}
