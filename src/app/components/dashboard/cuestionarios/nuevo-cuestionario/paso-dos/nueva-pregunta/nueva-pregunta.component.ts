import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css'],
})
export class NuevaPreguntaComponent {
  nuevaPregunta: FormGroup;
  //pregunta: Pregunta;
  rtaCorrecta = 0;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.nuevaPregunta = this.fb.group({
      titulo: ['', [Validators.required]],
      respuestas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.agregarRespuestasPorDefecto();
  }

  //Devuelve FormArray de respuestas
  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }
  //  metodo para agregar respuesta al array
  agregarRespuesta(): void {
    this.getRespuestas.push(
      this.fb.group({ descripcion: ['', [Validators.required]], esCorrecta: 0 })
    );
  }

  agregarRespuestasPorDefecto(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index: number): void {
    if (this.getRespuestas.length === 2) {
      this.toastr.error('Debe tener al menos dos respuestas', 'Error');
    } else {
      this.getRespuestas.removeAt(index);
    }
  }

  setRespuestaValida(index: number): void {
    this.rtaCorrecta = index;
  }
}
