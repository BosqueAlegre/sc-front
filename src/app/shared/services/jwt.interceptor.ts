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

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {

    TOKEN_KEY: string = 'access_token';

    constructor(private storage: Storage) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let promise = this.storage.get(this.TOKEN_KEY);

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