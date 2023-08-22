import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css'],
})
export class CuestionariosComponent {
  nombreUsuario!: string | null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNombreUsuario();
  }

  getNombreUsuario(): void {
    console.log(this.loginService.getTokenDecoded())
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
  }
}
