import { Component } from '@angular/core';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent {
  idCuestionario: number;
  constructor(
    private repsuestaCuestionario: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService
  ) {
    this.idCuestionario = 0;
  }
  ngOnInit(): void {
    this.idCuestionario = this.repsuestaCuestionario.idcuestionario;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.repsuestaCuestionario.idcuestionario);
    this.getCuestionario();
  }

  getCuestionario():void{
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=>{
      console.log(data)
    })
  }
}
