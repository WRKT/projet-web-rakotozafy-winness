import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeProduitComponent } from './components/liste-produit/liste-produit.component';
import { PanierComponent } from './components/panier/panier.component';
import { LoginComponent } from './components/login/login.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';

const appRoutes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'formulaire', component: FormulaireComponent},
  { path: 'login', component: LoginComponent},
  { path: 'catalogue', component: ListeProduitComponent },
  { path: 'panier', component: PanierComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
