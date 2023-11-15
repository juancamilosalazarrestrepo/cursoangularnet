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
  listPreguntas: Pregunta[] = [];
  loading = false;
  rtaConfirmada = false;
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada:number;
  constructor(
    private respuestaCuestionario: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService,
    private router: Router
  ) {
    this.idCuestionario = -1;
    this.idRespuestaSeleccionada = -1;
  }
  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionario.idcuestionario;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.respuestaCuestionario.idcuestionario);
    if (this.idCuestionario == -1) {
      this.router.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();
    this.respuestaCuestionario.respuestas = [];
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService
      .getCuestionario(this.idCuestionario)
      .subscribe((data) => {
        console.log(data);
        this.listPreguntas = data.listPreguntas;
        this.loading = false;
        this.respuestaCuestionario.cuestionario = data;
      });
  }

  obtenerPregunta(): string {
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex(): number {
    return this.index;
  }

  respuestaSeleccionada(respuesta: any,idRespuesta: number) {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;
  }

  AddClassOption(respuesta: any): string {
    if (respuesta === this.opcionSeleccionada) {
      return 'active text-ligth';
    }
    return '';
  }

  siguiente(): void {
   
    this.respuestaCuestionario.respuestas.push(this.idRespuestaSeleccionada)
    console.log(this.respuestaCuestionario.respuestas)
    this.rtaConfirmada = false;
    this.index++;
    console.log(this.index,this.listPreguntas.length)

    if (this.index === this.listPreguntas.length) {
      console.log(this.index,this.listPreguntas.length)
      this.router.navigate(['/inicio/respuestaCuestionario']);
    }
  }
}
