// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';

// Services
import { ProduitService } from '../services/produit.service';
import { ApiService } from '../services/api.service';
import { UtilisateurService } from 'src/services/utilisateur.service';

// Composants
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListeProduitComponent } from './components/liste-produit/liste-produit.component';
import { PanierComponent } from './components/panier/panier.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';

// States
import { PanierState } from './shared/states/panier-state';
import { LoginComponent } from './components/login/login.component';
import { ApiHttpInterceptor } from './http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ListeProduitComponent,
    PanierComponent,
    LoginComponent,
    AccueilComponent,
    FormulaireComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxsModule.forRoot([PanierState]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
      ApiService,
      ProduitService,
      UtilisateurService],
  bootstrap: [AppComponent],
})
export class AppModule {}
