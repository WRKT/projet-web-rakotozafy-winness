import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from '../../shared/states/panier-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Select(PanierState.getNbProduits) nb$? : Observable<number>;
  constructor() {};
}
