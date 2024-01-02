import { Produit } from '../models/produit.model';

export class AddProduit {
    static readonly type = '[Produit] Add';
    constructor(public payload: Produit) { }
}
  
export class RemoveProduit {
    static readonly type = '[Produit] Remove';
    constructor(public payload: Produit) { }
}

export class ClearProduit {
    static readonly type = '[Produit] Clear';
}