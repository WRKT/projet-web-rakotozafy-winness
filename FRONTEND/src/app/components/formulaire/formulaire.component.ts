import { Component } from '@angular/core';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  nom!: string;
  prenom!: string;
  adresse!: string;
  codePostal!: string;
  ville!: string;
  email!: string;
  sexe!: string;
  login!: string;
  password!: string;
  telephone!: number;

  creerUtilisateur() {
    console.log('Nouvel utilisateur créé :', {
      nom: this.nom,
      prenom: this.prenom,
      adresse: this.adresse,
      codePostal: this.codePostal,
      ville: this.ville,
      email: this.email,
      sexe: this.sexe,
      login: this.login,
      password: this.password,
      telephone: this.telephone
    });

  }
}
