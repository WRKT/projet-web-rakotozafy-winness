import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import { ProduitService } from 'src/services/produit.service';
import { Produit } from 'src/app/shared/models/produit.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login!: string;
  password!: string;
  nom!: string;
  prenom!: string;
  connected!: boolean;
  connexionOK!: string;
  connexionKO!: string;

  produits$: Observable<Array<Produit>>;
  constructor(private produitService: ProduitService, private apiService: ApiService) {
    this.produits$ = this.produitService.getProduits();
  }

  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe(
      (data) => {
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.connected = true;
        this.connexionOK = "Connexion réussie";
        this.connexionKO = "";
      },
      (error) => {
        console.log(error);
        this.connected = false;
        this.connexionKO = "Identifiants incorrects. Connexion échouée";
        this.connexionOK = "";
      }
    );
  }
}
