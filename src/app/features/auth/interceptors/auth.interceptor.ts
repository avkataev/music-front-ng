import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, catchError, filter, switchMap, take, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refresh$ = new BehaviorSubject<string | null>(null);

  constructor(
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // SSR — ничего не делаем
    if (!isPlatformBrowser(this.platformId)) {
      return next.handle(req);
    }

    const token = this.auth.accessToken();

    const authReq = token
      ? req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
        withCredentials: true,
      })
      : req;

    return next.handle(authReq).pipe(
      catchError(err => {
        if (
          err.status === 401 &&
          !req.url.includes('/auth/refresh')
        ) {
          return this.handle401(authReq, next);
        }

        return throwError(() => err);
      }),
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refresh$.next(null);

      return this.auth.refresh().pipe(
        switchMap(token => {
          this.isRefreshing = false;
          this.refresh$.next(token);

          return next.handle(
            req.clone({
              setHeaders: {Authorization: `Bearer ${token}`},
              withCredentials: true,
            }),
          );
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.auth.logout();
          return throwError(() => err);
        }),
      );
    }

    // ждём, пока другой запрос обновит токен
    return this.refresh$.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token =>
        next.handle(
          req.clone({
            setHeaders: {Authorization: `Bearer ${token}`},
            withCredentials: true,
          }),
        ),
      ),
    );
  }
}
