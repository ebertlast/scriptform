import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { Arch } from '../../modelos/arch';
import { Arc } from '../../modelos/arc';
import { ArcService } from '../../servicios/arc.service';
import { environment } from '../../../../../environments/environment';
import { Afi } from '../../../general/modelos/afi';
import { AfiService } from '../../../general/servicios/afi.service';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _arcService: ArcService,
    private _afiService: AfiService,
  ) { }

  // #region Métodos de obtención y establecimiento
  private _arc: Arc = new Arc();
  public get arc(): Arc {
    return this._arc;
  }
  public set arc(v: Arc) {
    this._arc = v;
  }

  private _arcs: Arc[] = [];
  public get arcs(): Arc[] {
    return this._arcs;
  }
  public set arcs(v: Arc[]) {
    this._arcs = v;
  }


  private _afi: Afi = new Afi();
  public get afi(): Afi {
    return this._afi;
  }
  public set afi(v: Afi) {
    this._afi = v;
  }

  // #endregion


  ngOnInit() {
    this._activatedRoute.params.forEach((params: Params) => {
      this._arcService.archivos(params['archivoid']).subscribe(arcs => {
        arcs.forEach(arc => {
          arc.URLARCHIVO = environment.urlFilesUploads + arc.URLARCHIVO;
          this.arc = arc;
        });
        this._afiService.afiliadoPorDocumento(this.arc.TIPODOCUMENTO, this.arc.NUMEROIDENTIFICACION).subscribe(afis => {
          afis.forEach(afi => {
            this.afi = afi;
          });
        });
        this._arcService.archivosPorAfiliado(this.arc.TIPOID, this.arc.NUMEROIDENTIFICACION).subscribe(archivos => {
          this.arcs = archivos;
        });
        console.log(this.arc);
        console.log(this.afi);
      });
    });
  }

}
