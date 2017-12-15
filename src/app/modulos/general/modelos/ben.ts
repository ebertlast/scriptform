import { Afi } from './afi';
import { Tipr } from './tipr';

export class Ben extends Afi {
    constructor(public TipoRelacion: Tipr = new Tipr()) {
        super();
    }
}
