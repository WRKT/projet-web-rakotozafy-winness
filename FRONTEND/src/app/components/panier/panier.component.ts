import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../shared/models/produit.model';
import { Select, Store } from '@ngxs/store';
import { PanierState } from '../../shared/states/panier-state';
import {
  RemoveProduit,
  ClearProduit,
} from '../../shared/actions/panier-actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent {

  prixTotal!: Observable<number>;
  paiement!: string;

  constructor(private store: Store) {}

  @Select(PanierState.getListePanier) listeProduitsPanier$!: Observable<Produit[]>;

  Remove(produit: Produit) {
    this.store.dispatch(new RemoveProduit(produit));
  }

  Clear() {
    this.store.dispatch(new ClearProduit());
  }

  Acheter() {
    this.paiement = "Paiement effectué";
    this.store.dispatch(new ClearProduit());
  }

  ngOnInit() {
    this.listeProduitsPanier$.subscribe(produits => {
      console.log('Liste des produits dans le panier:', produits);
    });
    
    this.prixTotal = this.listeProduitsPanier$.pipe(
      map((produits) => {
        let total = 0;
        produits.forEach((produit) => {
          total += produit.prix;
        });
        return total;
      })
    );
  }
}
