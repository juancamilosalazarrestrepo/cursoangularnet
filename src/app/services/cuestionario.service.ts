import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root',
})
export class CuestionarioService {
  tituloCuestionario: string;
  descripcionCuestionario: string;
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.tituloCuestionario = '';
    this.descripcionCuestionario = '';
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Cuestionario/';
  }

  guardarCuestionario(cuestionario: Cuestionario): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, cuestionario);
  }

  getListCuestionario(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + "GetListCuestionarioByUser");

  
  }

  deleteCuestionario(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  getCuestionario(idCuestionario: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario);
  }
}
