import { Component } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { UtilisateurService } from 'src/services/utilisateur.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  client: Client = {
    nom: '',
    prenom: '',
    adresse: '',
    codepostal: '',
    ville: '',
    email: '',
    sexe: '',
    login: '',
    password: '',
    telephone: ''
  };

  constructor(private service: UtilisateurService) { }

  creerUtilisateur() {
    console.log('Création de l\'utilisateur', this.client);
    this.service.creerUtilisateur(this.client)
      .subscribe(
        (response) => {
          console.log('Utilisateur créé avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
        }
      );
  }
}
