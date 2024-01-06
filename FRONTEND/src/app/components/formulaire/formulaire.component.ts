import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UtilisateurService } from 'src/services/utilisateur.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      codepostal: ['', Validators.required],
      ville: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexe: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  creerUtilisateur() {
    console.log("Création de l'utilisateur", this.clientForm.value); // ici ça m'affiche bien mes données
    this.utilisateurService.creerUtilisateur(this.clientForm.value).subscribe(
      (data) => {
        console.log('Utilisateur créé avec succès', data); // ici ça m'affiche des données vides
      },
      (error) => {
        console.error("Erreur lors de la création de l'utilisateur", error);
      }
    );
  }
}
