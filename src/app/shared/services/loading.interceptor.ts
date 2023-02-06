import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(private _loadingCtrl: LoadingController) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.presentLoading();
    return next.handle(request).pipe(
      finalize(() => this._loadingCtrl.dismiss())
    );
  }

	async presentLoading() {
		const loading = await this._loadingCtrl.create({ message: 'Solicitando...' });
		loading.present();
	}
}

export const HTTP_LOADING_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoadingInterceptor,
  multi: true,
};
