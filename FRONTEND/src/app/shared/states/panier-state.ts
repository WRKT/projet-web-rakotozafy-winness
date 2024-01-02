import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduit, ClearProduit, RemoveProduit } from '../actions/panier-actions';
import { PanierStateModel } from '../models/panier-state.model';

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
    { getState, patchState }: StateContext<PanierStateModel>,
    { payload }: AddProduit
  ) {
    const state = getState();
    patchState({
      panier: [...state.panier, payload],
    })
  }

  @Action(RemoveProduit)
  Remove(
    { getState, patchState }: StateContext<PanierStateModel>,
    { payload }: RemoveProduit
  ) {
    const state = getState();
    patchState({
      panier: state.panier.filter((x) => !(payload.nom == x.nom)),
    })
  }

  @Action(ClearProduit)
  Clear({ patchState }: StateContext<PanierStateModel>)
  {
    patchState({
      panier:[] // Vide le panier
    })
  }
}
