import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(private http: HttpClient) {}
  
  creerUtilisateur(client: Client): Observable<any> {
    return this.http.post<Client>(environment.backendCreationCompte, client);
  }
}
