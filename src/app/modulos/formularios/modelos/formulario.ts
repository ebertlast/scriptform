import { Ben } from '../../general/modelos/ben';
import { Empl } from '../../general/modelos/empl';

export class Formulario {
    constructor(
        public FormularioID: string = '',
        public TipoTramite: string = '',
        public TipoAfiliacion: string = '',
        public Regimen: string = '',
        public TipoAfiliado: string = '',
        public TipoCotizante: string = '',
        public PrimerApellido: string = '',
        public SegundoApellido: string = '',
        public PrimerNombre: string = '',
        public SegundoNombre: string = '',
        public TipoDocumentoIdentidad: string = '',
        public DocumentoIdentidad: string = '',
        public Sexo: string = '',
        public FechaNacimiento: string = '',
        public Etnia: string = '',
        public TipoDiscapacidad: string = '',
        public GradoDiscapacidad: string = '',
        public PuntajeSISBEN: string = '',
        public GrupoPoblacionalEspecial: string = '',
        public ARL: string = '',
        public AP: string = '',
        public IBC: string = '',
        public Direccion: string = '',
        public TelefonoFijo: string = '',
        public TelefonoCelular: string = '',
        public CorreoElectronico: string = '',
        public Zona: string = '',
        public Municipio: string = '',
        public Localidad: string = '',
        public Conyugue: Ben = new Ben(),
        public Beneficiarios: Ben[] = [],
        public Empleador: Empl = new Empl()
    ) { }
}
