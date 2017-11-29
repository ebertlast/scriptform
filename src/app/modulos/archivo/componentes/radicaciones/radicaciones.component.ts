import { Component, OnInit } from '@angular/core';
import { ArcService } from '../../servicios/arc.service';
import { ArchService } from '../../servicios/arch.service';
import { Arc } from '../../modelos/arc';
import { Arch } from '../../modelos/arch';
import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-radicaciones',
  templateUrl: './radicaciones.component.html',
  styleUrls: ['./radicaciones.component.css']
})
export class RadicacionesComponent implements OnInit {

  constructor(
    private _arcService: ArcService,
    private _archService: ArchService,
    private _domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.refrescarArchivos();
  }

  // #region Metodos de obtención y establecimientos
  private _archivos: Arc[] = [];
  public get archivos(): Arc[] {
    return this._archivos;
  }
  public set archivos(v: Arc[]) {
    this._archivos = v;
  }

  // #endregion

  public refrescarArchivos() {
    this.archivos = [];
    this._arcService.archivos().subscribe(archivos => {
      archivos.forEach(archivo => {
        this._archService.archivos(archivo.ARCHIVOID).subscribe(pdfs => {
          let urlArchivo = '';
          pdfs.forEach(_pdf => {
            urlArchivo = environment.urlFilesDownload + _pdf.NOMBRE;
          });
          archivo.URLARCHIVO = urlArchivo;
          this.archivos.push(archivo);
        });
      });
      console.log(this.archivos);
    });
  }
}
