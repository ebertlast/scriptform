import { Component, OnInit } from '@angular/core';
import { ArcService } from '../../servicios/arc.service';
import { ArchService } from '../../servicios/arch.service';
import { Arc } from '../../modelos/arc';
import { Arch } from '../../modelos/arch';
import { environment } from '../../../../../environments/environment';
declare var $: any;
declare var ace: any;
@Component({
  selector: 'app-radicaciones',
  templateUrl: './radicaciones.component.html',
  styleUrls: ['./radicaciones.component.css']
})
export class RadicacionesComponent implements OnInit {

  public cargando = false;
  constructor(
    private _arcService: ArcService,
    private _archService: ArchService,
  ) { }


  // #region Metodos de obtención y establecimientos
  private _archivos: Arc[] = [];
  public get archivos(): Arc[] {
    return this._archivos;
  }
  public set archivos(v: Arc[]) {
    this._archivos = v;
  }
  private _consultaPor = '1';
  public get consultaPor(): string {
    return this._consultaPor;
  }
  public set consultaPor(v: string) {
    this._consultaPor = v;
  }
  private _textoAConsultar = '';
  public get textoAConsultar(): string {
    return this._textoAConsultar;
  }
  public set textoAConsultar(v: string) {
    this._textoAConsultar = v;
  }
  // #endregion

  ngOnInit() {
    this.refrescarArchivos();

  }

  generarCodigoBarrasPRUEBA() {
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

  public pdfPantallaCompleta(iframeId) {
    const iframe = $('#' + iframeId);
    const win = window.open();
    win.document.write('<iframe width="100%" height="100%" src="' + iframe.attr('src') + '" frameborder="0" allowfullscreen></iframe>');
    return false;
  }

  // public iframeclick(idframeid) {
  //   document.getElementById(idframeid).contentWindow.document.body.onclick = function () {
  //     // document.getElementById('theiframe').contentWindow.location.reload();
  //     console.log(idframeid);
  //   }
  // }
}

