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
        let promise = this.storage.get(environment.token_key);

        return from(promise)
        .pipe(
            mergeMap(token => {
                let clonedReq = this.addToken(request, token);
                return next.handle(clonedReq);
            })
        )
    }

    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Authorization: 'bearer ' + token,
                },
            })

            return clone;
        }

        return request;
    }
}

export const HTTP_JWT_INTERCEPTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
};