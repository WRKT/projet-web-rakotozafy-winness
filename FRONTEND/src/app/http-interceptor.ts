import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  jwtToken: String = '';
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.jwtToken != '') {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.jwtToken}` },
      });
      console.log('Bearer renvoyé : ' + this.jwtToken);
    }

    return next.handle(req).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          let tab: Array<String>;
          let enteteAuthorization = evt.headers.get('Authorization');
          if (enteteAuthorization != null) {
            tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
            if (tab.length > 1) {
              this.jwtToken = tab[1];
              console.log('Bearer récupéré : ' + this.jwtToken);
            }
          }
        }
      })
    );
  }
}
