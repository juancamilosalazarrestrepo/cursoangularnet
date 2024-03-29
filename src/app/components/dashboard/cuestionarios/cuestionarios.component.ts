import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/internal/operators/finalize';
import { tap } from 'rxjs/internal/operators/tap';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css'],
})
export class CuestionariosComponent {
  nombreUsuario!: string | null;
  loading = false;
  listCuestionarios$: Observable<Cuestionario[]>;

  constructor(
    private loginService: LoginService,
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService
  ) {
    this.listCuestionarios$ = this.cuestionarioService
      .getListCuestionarioByUser()
      .pipe(
        tap(() => {
          this.loading = true;
        }),
        finalize(() => {
          this.loading = false;
        })
      );
    console.log(this.listCuestionarios$);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNombreUsuario();
    //this.getCuestionarios();
  }

  getNombreUsuario(): void {
    console.log(this.loginService.getTokenDecoded());
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
  }

  /*getCuestionarios(): void {
    this.cuestionarioService.getListCuestionario().subscribe((data) => {
      console.log(data);
      this.listCuestionarios = data;
    },error =>{
      console.log(error)
    });
  }*/

  eliminarCuestionario(idCuestionario: any): void {
    if (confirm('¿Esta seguro que desea eliminar el cuestionario?')) {
      this.loading = true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(
        (data) => {
          this.toastr.success(
            'Cuestionario eliminado con éxito',
            'Cuestionario Eliminado'
          );
          this.listCuestionarios$ = this.cuestionarioService
            .getListCuestionarioByUser()
            .pipe(
              tap(() => {
                this.loading = true;
              }),
              finalize(() => {
                this.loading = false;
              })
            );
          console.log(this.listCuestionarios$);
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.toastr.error('Error al eliminar cuestionario', 'Error');
        }
      );
    }
  }
}
