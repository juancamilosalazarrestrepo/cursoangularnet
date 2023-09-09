import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root',
})
export class RespuestaCuestionarioService {
  nombreParticipante: string;
  idcuestionario: number;
  respuestas: number[] = [];
  cuestionario: Cuestionario;
  constructor() {
    this.nombreParticipante = '';
    this.idcuestionario = 0;
    this.cuestionario = {
      id: 0,
      nombre: '',
      descripcion: '',
      listPreguntas: [],
    };
  
  }
}
