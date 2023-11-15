import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-respuestacuestionario',
  templateUrl: './respuestacuestionario.component.html',
  styleUrls: ['./respuestacuestionario.component.css']
})
export class RespuestacuestionarioComponent implements OnInit {
  cuestionario: Cuestionario;
  respuestaUsuario:number[] = []
  constructor(private respuestaCuestionarioService : RespuestaCuestionarioService,
    private router: Router
    ) {
      console.log("constructor")
      this.cuestionario = this.respuestaCuestionarioService.cuestionario;
  }

  ngOnInit(): void {
    console.log("on init")

      if(this.respuestaCuestionarioService.idcuestionario == null){
this.router.navigate(['/inicio']);
      }else{
        this.cuestionario = this.respuestaCuestionarioService.cuestionario;
        this.respuestaUsuario = this.respuestaCuestionarioService.respuestas;
        console.log(this.cuestionario)
        console.log(this.respuestaUsuario)


      }
  }

}
