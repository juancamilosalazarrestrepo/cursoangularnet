import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listEstudiantes: any[] = [{
    nombre: "juan salazar",
    estado: "promocionado"
  },
  {
    nombre: "Lucas peres",
    estado: "regular"
  },
  {
    nombre: "camilo salazar",
    estado: "Excelente"
  }]

  mostrar = true

  toogle(): void {
    this.mostrar = !this.mostrar
  }

}
