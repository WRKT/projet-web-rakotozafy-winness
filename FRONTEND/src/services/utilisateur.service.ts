import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../app/shared/models/client.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(private http: HttpClient) {}

  creerUtilisateur(client: Client): Observable<any> {
    return this.http.post(environment.backendCreationCompte, client)
      // .pipe(
      //   catchError(this.handleError)
      // );
  }

  // private handleError(error: any): Observable<any> {
  //   console.error('Une erreur s\'est produite', error);
  //   return throwError(error);
  // }
}
