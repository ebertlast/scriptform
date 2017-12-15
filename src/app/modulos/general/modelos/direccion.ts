export class Direccion {
    constructor(
        /**
         * 1.- Tipo de Vía
         */
        public TipoViaPrincipal: string = '',
        /**
         * 2.- Nombre o número de vía
         */
        public NumeroViaPrincipal: string = '',
        /**
         * 3.- Letra vía principal
         */
        public LetraViaPrincipal: string = '',
        /**
         * 4.- Bis
         */
        public Bis: string = '',
        /**
         * 5.- Letra Bis
         */
        public LetraBis: string = '',
        /**
         * 6.- Prefijo o Cuadrante
         */
        public CuadranteViaPrincipal: string = '',
        /**
         * 7.- Número vía secundaria
         */
        public NumeroViaSecundaria: string = '',
        /**
         * 8.- Letra vía Secundaria
         */
        public LetraViaSecundaria: string = '',
        /**
         * 9.- Número de Placa
         */
        public NumeroPlaca: string = '',
        /**
         * 10.- Cuadrante Vía Secundaria
         */
        public CuadranteViaSecundaria: string = '',
        /**
         * 11.- Direccion Complementaria
         */
        public DireccionComplementaria: string = '',
    ) { }
}
