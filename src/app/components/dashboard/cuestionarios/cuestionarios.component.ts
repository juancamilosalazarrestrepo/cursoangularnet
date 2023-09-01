import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css'],
})
export class CuestionariosComponent {
  nombreUsuario!: string | null;
  listCuestionarios: Cuestionario[] = [];

  constructor(
    private loginService: LoginService,
    private cuestionarioService: CuestionarioService,
    toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNombreUsuario();
    this.getCuestionarios();  
  }

  getNombreUsuario(): void {
    console.log(this.loginService.getTokenDecoded());
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
  }

  getCuestionarios(): void {
    this.cuestionarioService.getListCuestionario().subscribe((data) => {
      console.log(data);
      this.listCuestionarios = data;
    },error =>{
      console.log(error)
    });
  }
}
