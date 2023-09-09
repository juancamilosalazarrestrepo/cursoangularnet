import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css'],
})
export class IngresarNombreComponent {
  nombreParticipante = '';
  constructor(
    private router: Router,
    private respuestaCuestionario: RespuestaCuestionarioService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.respuestaCuestionario.idcuestionario == -1) {
      this.router.navigate(['/inicio']);
      return;
    }
  }

  siguiente(): void {
    this.respuestaCuestionario.nombreParticipante = this.nombreParticipante;
    this.router.navigate(['/inicio/pregunta']);
  }
}
