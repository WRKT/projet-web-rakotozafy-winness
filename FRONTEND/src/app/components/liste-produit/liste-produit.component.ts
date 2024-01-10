import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProduitService } from 'src/services/produit.service';
import { Produit } from 'src/app/shared/models/produit.model';
import { AddProduit } from 'src/app/shared/actions/panier-actions';
import { Store } from '@ngxs/store';
import { Observable, fromEvent, of, startWith } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit, AfterViewInit {
  model$?: Observable<any>;
  searchField$?: Observable<any>;

  @ViewChild('input', { static: true }) input!: ElementRef;

  constructor(private produitService: ProduitService, private store: Store) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(produits => this.model$ = of(produits));
  }

  ngAfterViewInit(): void {
    this.searchField$ = fromEvent(this.input.nativeElement, 'input').pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        const term = (this.input.nativeElement as HTMLInputElement).value.trim();
        return term ? this.produitService.search(term) : this.produitService.getProduits();
      }),
      catchError((error) => {
        console.error(error);
        return of([] as Produit[]);
      })
    );

    this.searchField$.subscribe((result) => {
      if (Array.isArray(result)) {
        this.model$ = of(result);
      }
    });
  }

  addProduit(produit: Produit): void {
    this.store.dispatch(new AddProduit(produit));
  }
}

