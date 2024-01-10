import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProduitService } from 'src/services/produit.service';
import { Produit } from 'src/app/shared/models/produit.model';
import { AddProduit } from 'src/app/shared/actions/panier-actions';
import { Store } from '@ngxs/store';
import { Observable, fromEvent, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit, AfterViewInit {
  model$?: Observable<Produit[]>;
  searchField$?: Observable<any>;

  @ViewChild('input', { static: true }) input!: ElementRef;

  constructor(private produitService: ProduitService, private store: Store) {}

  ngOnInit(): void {
    this.model$ = this.produitService.getProduits();
  }

  ngAfterViewInit(): void {
    this.searchField$ = fromEvent(this.input.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) =>
        this.produitService.search(term).pipe(
          catchError((error) => {
            console.error(error);
            return of([] as Produit[]);
          })
        )
      )
    );
  }

  addProduit(produit: Produit): void {
    this.store.dispatch(new AddProduit(produit));
  }
}

