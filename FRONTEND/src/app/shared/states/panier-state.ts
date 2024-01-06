import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduit, ClearProduit, RemoveProduit } from 'src/app/shared/actions/panier-actions';
import { PanierStateModel } from 'src/app/shared/models/panier-state.model';

@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    panier: [],
  },
})
@Injectable()
export class PanierState {
  @Selector()
  static getNbProduits(state: PanierStateModel) {
    return state.panier.length;
  }

  @Selector()
  static getListePanier(state: PanierStateModel) {
    return state.panier;
  }

  @Action(AddProduit)
  Add(
    { getState, setState }: StateContext<PanierStateModel>,
    { payload }: AddProduit
  ) {
    const state = getState();
    setState({
      panier: [...state.panier, payload],
    })
  }

  @Action(RemoveProduit)
  Remove(
    { getState, setState }: StateContext<PanierStateModel>,
    { payload }: RemoveProduit
  ) {
    const state = getState();
    setState({
      panier: state.panier.filter((x) => !(payload.nom == x.nom)),
    })
  }

  @Action(ClearProduit)
  Clear({ setState }: StateContext<PanierStateModel>)
  {
    setState({
      panier:[] // Vide le panier
    })
  }
}
