import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login : FormGroup

constructor(private fb:FormBuilder){
  this.login = this.fb.group({
    usuario:['',Validators.required],
    password:['',Validators.required]
  });
}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  log():void{
    console.log(this.login)
    const usuario:Usuario = {
      nombreUsuario: this.login.value.usuario,
      password:this.login.value.password
    }
    console.log(usuario)
  }

}
