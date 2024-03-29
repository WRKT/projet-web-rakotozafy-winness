import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { PanierState } from 'src/app/shared/states/panier-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Select(PanierState.getNbProduits) nb$? : Observable<number>;

  headerTitle!: string;

  constructor(private router: Router) { };

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderTitle();
      }
    });
  }
  private updateHeaderTitle() {
    const currentRoute = this.router.url;
  
    switch (currentRoute) {
      case '/formulaire':
        this.headerTitle = 'INSCRIPTION';
        break;
      case '/login':
        this.headerTitle = 'CONNEXION';
        break;
      case '/catalogue':
        this.headerTitle = 'CATALOGUE';
        break;
      case '/panier':
        this.headerTitle = 'PANIER';
        break;
      default:
        this.headerTitle = 'ACCUEIL';
    }
  }
}
