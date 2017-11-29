import { Component, OnInit } from '@angular/core';
import { ArcService } from '../../servicios/arc.service';
import { ArchService } from '../../servicios/arch.service';
import { Arc } from '../../modelos/arc';
import { Arch } from '../../modelos/arch';
import { environment } from '../../../../../environments/environment';
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
  ) { }

  ngOnInit() {
    this.refrescarArchivos();
  }

  generarCodigoBarras() {
    const canvas: any = document.getElementById('codebar');
    const context = canvas.getContext('2d');
    const imageObj = new Image();
    imageObj.onload = function () {
      context.drawImage(imageObj, 10, 10);
      context.font = '40pt Calibri';
      context.fillText('My TEXT!', 20, 20);
    };
    imageObj.src = 'http://bwipjs-api.metafloor.com/?bcid=code128&text=1234567890&includetext';
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

      // archivos.forEach(archivo => {
      //   this._archService.archivos(archivo.ARCHIVOID).subscribe(pdfs => {
      //     let urlArchivo = '';
      //     pdfs.forEach(_pdf => {
      //       urlArchivo = environment.urlFilesDownload + _pdf.NOMBRE;
      //     });
      //     archivo.URLARCHIVO = urlArchivo;
      //     this.archivos.push(archivo);
      //   });
      // });
      // this.archivos = archivos;
      archivos.forEach(archivo => {
        archivo.URLARCHIVO = environment.urlFilesDownload + archivo.URLARCHIVO;
        this.archivos.push(archivo);
      });
      console.log(this.archivos);
    });
  }
}
