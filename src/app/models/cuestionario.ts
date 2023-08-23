import { Pregunta } from './pregunta';

export class Cuestionario {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaDeCreacion?: Date;
  listPreguntas: Pregunta[];

  constructor(
    nombre: string,
    descripcion: string,
    fechaDeCreacion: Date,
    listPreguntas: Pregunta[]
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaDeCreacion = fechaDeCreacion;
    this.listPreguntas = listPreguntas;
  }
}
