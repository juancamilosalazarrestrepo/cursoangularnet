import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { FormArray } from '@angular/forms';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css'],
})
export class NuevaPreguntaComponent {
  nuevaPregunta: FormGroup;
  //pregunta: Pregunta;
  rtaCorrecta = 0;
  @Output() enviarPregunta = new EventEmitter<Pregunta>();

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

  agregarPregunta(): void {
    //obtenemos el titulo de la pregunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo')?.value;
    //obtenermos el array de respuestas
    const arrayRespuestas = this.nuevaPregunta.get('respuestas')?.value;

    //Creamos un array de repsuestas
    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element: any, index: number) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);
      if (index === this.rtaCorrecta) {
        respuesta.esCorrecta = true;
      }
      arrayRta.push(respuesta);
    });
    //creamos una pregunta
    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);
    this.enviarPregunta.emit(pregunta);
    this.reset();
  }

  reset(): void {
    this.rtaCorrecta = 0;

    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestasPorDefecto();
  }
}
