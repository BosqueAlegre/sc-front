import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private storage: Storage) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.get(environment.token_key)).pipe(mergeMap((token) => {
            const changedReq = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            return next.handle(changedReq);
        }));
    }
}

export const HTTP_JWT_INTERCEPTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
};