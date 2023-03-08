import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listEstudiantes: any[] = [{
    nombre: "juan salazar",
    estado: "Promocionado"
  },
  {
    nombre: "Lucas peres",
    estado: "Regular"
  },
  {
    nombre: "camilo salazar",
    estado: "Promocionado"
  }, {
    nombre: "Nicolas",
    estado: "Libre"
  }]

  mostrar = true

  toogle(): void {
    this.mostrar = !this.mostrar
  }

}
