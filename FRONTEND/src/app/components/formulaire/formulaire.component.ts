import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/services/utilisateur.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  clientForm!: FormGroup;
  formError!: string;
  formSuccess!: string;

  regexLogin = /^[a-zA-Z0-9.]{1,20}$/;
  regexPassword = /^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-]{6,20}$/;
  regexTelephone = /^[0-9]{10}$/;
  regexCodePostal = /^[0-9]{5}$/;
  regexString = /^[A-Za-z_]+-?[A-Za-z]+$/;
  regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

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
    console.log(this.clientForm.value);
    if (this.clientForm.valid) {
      this.utilisateurService.creerUtilisateur(this.clientForm.value).subscribe(
        (data) => {
          console.log('Utilisateur créé avec succès', data);
          this.formSuccess = 'Utilisateur créé avec succès';
          this.clientForm.reset();
        },
        (error) => {
          console.error("Erreur lors de la création de l'utilisateur", error);
        }
      );
    } else {
      this.formError = 'Le formulaire contient des erreurs. Veuillez vérifier les champs.';
    }
    
  }
}