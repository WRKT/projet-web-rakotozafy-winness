import { Component, OnInit, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import { ProduitService } from 'src/services/produit.service';
import { Produit } from 'src/app/shared/models/produit.model';
import { AddProduit } from 'src/app/shared/actions/panier-actions';
import { Store } from '@ngxs/store';
import { Observable, fromEvent, of } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})

export class ListeProduitComponent implements OnInit {
  model?: Observable<any>;
  searchField$?: Observable<any>;

  constructor(private produitService : ProduitService, private store: Store) { 
  }

  ngOnInit(): void { }

  addProduit(produit: Produit) {
    this.store.dispatch(new AddProduit(produit));
  }

  // Filtre de recherche
  @ViewChild('input', { static: true }) input!: ElementRef;

  ngAfterViewInit() {
    this.searchField$ = fromEvent(this.input.nativeElement, 'keyup');
    this.model = this.searchField$.pipe(
      map((event) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) =>
        this.produitService.search(term).pipe(
          catchError(() => {
            return of([]);
          })
        )
      )
    );
  }
}
