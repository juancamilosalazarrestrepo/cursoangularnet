import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css'],
})
export class CuestionarioComponent {
  idCuestionario: number;
  loading = false;
  cuestionario:any={};
  constructor(
    private cuestionarioService: CuestionarioService,
    private aRoute: ActivatedRoute
  ) {
    this.idCuestionario = +this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe({
      
      next: (cuestionario) => {
        console.log(cuestionario);
        this.cuestionario = cuestionario;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }
}
