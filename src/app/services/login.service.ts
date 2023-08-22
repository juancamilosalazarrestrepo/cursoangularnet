import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Login';
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  /*getNombreUsuario(): string | null {
    return localStorage.getItem('nombreUsuario');
  }*/

  getTokenDecoded(): any {
    let token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken;
    } else {
      throw new Error('Token not found in localStorage');
    }
  }

  removeLocalStorage(): void {
    localStorage.removeItem('token');
  }
}
