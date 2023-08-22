import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css'],
})
export class CambiarPasswordComponent {
  cambiarPassword: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) {
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

    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword,
    };
    console.log(changePassword);
    this.usuarioService.changePassword(changePassword).subscribe(
      (data) => {
        this.toastr.info(data.message, 'info');
        this.router.navigate(['/dasboard']);
      },
      (error) => {
        this.loading = false;
        this.cambiarPassword.reset();
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
}
