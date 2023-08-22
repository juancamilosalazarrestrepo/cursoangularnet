import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  register: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {
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
    const usuario: Usuario = {
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password,
    };
    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success(
          'El usuario ' + usuario.nombreUsuario + ' se ha registrado con exito',
          'Usuario registrado'
        );
        this.router.navigate(['/inicio/login']);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error.error.message);
        this.toastr.error(error.error.message, 'Error de registro');
        this.register.reset();
      }
    );
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;

    return pass === confirmPassword ? null : { notSame: true };
  }
}
