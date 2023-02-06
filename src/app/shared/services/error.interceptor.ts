import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private _alertController: AlertController,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.error.invalidToken) {
                this._authService.logout();
                this.router.navigate(['/login']);
            }

            const error = err.error.message;
            this.showAlert(error);

            return throwError(error);
        }))
    }

    async showAlert(message: string) {
        const alert = await this._alertController.create({
            header: 'Error',
            message,
            buttons: ['Cerrar'],
        });
    
        await alert.present();
    }
}

export const HTTP_ERROR_INTERCEPTOR = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};
