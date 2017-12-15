export class Ips {
    constructor(
        public Regional: string = '',
        public Municipio: string = '',
        public Departamento: string = '',
        public Codigo_Cda: string = '',
        public Prestador_Medico: string = '',
        public ID_Med: string = '',
        public Codigo_Med_BH: string = '',
        public Direccion_Med: string = '',
        public Telefono_Med: string = '',
        public Estado_de_la_Asignacion_medica: string = '',
        public Prestador_Odontologico: string = '',
        public ID_Odo: string = '',
        public Codigo_Odo_BH: string = '',
        public Direccion_Odo: string = '',
        public Telefono_Odo: string = '',
        public Estado_Asignacion_Odontologica: string = '',
        public Tipo: string = '',
        public Libre_Eleccion_Medicina: string = '',
        public Libre_Eleccion_Odontologia: string = '',
    ) { }
}
