import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../shared/models/produit.model';
import { Select, Store } from '@ngxs/store';
import { PanierState } from '../../shared/states/panier-state';
import { RemoveProduit, ClearProduit } from '../../shared/actions/panier-actions';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  constructor(private store: Store) {}

  @Select(PanierState.getListePanier) listeProduitsPanier$!: Observable<Produit[]>;

  Remove(produit: Produit)
  {
    this.store.dispatch(new RemoveProduit(produit));
  }

  Clear()
  {
    this.store.dispatch(new ClearProduit());
  }
  ngOnInit() {}
}
