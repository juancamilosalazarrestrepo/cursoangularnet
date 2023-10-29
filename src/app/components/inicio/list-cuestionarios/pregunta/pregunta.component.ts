import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent {
  idCuestionario: number;
  listPreguntas:Pregunta[]=[];
  loading=false;
  rtaConfirmada = false;
  constructor(
    private repsuestaCuestionario: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService,
    private router: Router
  ) {
    this.idCuestionario = -1;
  }
  ngOnInit(): void {
    this.idCuestionario = this.repsuestaCuestionario.idcuestionario;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.repsuestaCuestionario.idcuestionario);
    if(this.idCuestionario==-1){
      this.router.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.loading = true
    this.cuestionarioService
      .getCuestionario(this.idCuestionario)
      .subscribe((data) => {
        console.log(data);
        this.listPreguntas = data.listPreguntas;
        this.loading = false
      });
  }

  obtenerPregunta():string {
    return this.listPreguntas[0].descripcion
  }

  getIndex():number {
    return 0;
  }
}
