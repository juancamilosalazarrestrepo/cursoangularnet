import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  myAppUrl: string;
  myapiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myapiUrl = '/api/Usuario';
  }

  //https://localhost:7085/api/Usuario -- POST
  saveUser(usuario: Usuario): Observable<any> {
    return this.http.post(this.myAppUrl + this.myapiUrl, usuario);
  }

  changePassword(changePassword: any): Observable<any> {
    return this.http.put(
      this.myAppUrl + this.myapiUrl + '/CambiarPassword',
      changePassword
    );
  }
}
