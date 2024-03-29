import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css'],
})
export class ListCuestionariosComponent {
  loading = false;
  listCuestionarios: Cuestionario[] = [];
  constructor(private cuestionarioService: CuestionarioService,
    private router: Router,private respuestaCuestionario: RespuestaCuestionarioService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getListCuestionarios();
  }

  getListCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarios().subscribe((data) => {
      this.loading=false;
      this.listCuestionarios = data;
      console.log(data);
    });
  }

  ingresarNombre(idCuestionario:number):void{
this.respuestaCuestionario.idcuestionario = idCuestionario;
this.router.navigate(['/inicio/ingresarNombre']);
  }
}
