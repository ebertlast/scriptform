import { Arch } from './arch';

export class Arc {
    constructor(
        public ARCHIVOID: string = '',
        public FORMULARIOID: string = '',
        public TIPOID: string = '',
        public NUMEROIDENTIFICACION: string = '',
        public FECHAREGISTRO: string = '',
        public FECHARADICACION: string = '',
        public MUNICIPIOID: string = '',
        public USUARIOID: string = '',
        public NUEVOREGISTRO: boolean = false,
        public CANTIDADBENEFICIARIOS: number = 0,
        public TIPODOCUMENTO: string = '',
        public MUNICIPIO: string = '',
        public USAURIO: string = '',
        public URLARCHIVO: string = ''
    ) { }
}
