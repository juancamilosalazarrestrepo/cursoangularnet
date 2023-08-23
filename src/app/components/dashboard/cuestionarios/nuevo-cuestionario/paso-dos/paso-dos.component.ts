import { Component } from '@angular/core';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent {
  tituloCuestionario: string;
  descripcionCuestionario: string;
constructor(private cuestionarioService: CuestionarioService) { 
  this.tituloCuestionario = ""
  this.descripcionCuestionario = ""

}
ngOnInit(): void {
this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
}
}
