import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  log(): void {
    this.loading = true;
    setTimeout(() => {
      console.log(this.login);
      const usuario: Usuario = {
        nombreUsuario: this.login.value.usuario,
        password: this.login.value.password,
      };
      console.log(usuario);
      if (
        usuario.nombreUsuario === 'jsalazar' &&
        usuario.password === '1234567'
      ) {
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error('usuario o Contraseña Incorrecto', 'Error');
      }
      this.loading = false;
    }, 3000);
  }
}
