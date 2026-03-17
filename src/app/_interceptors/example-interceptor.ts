import {HttpErrorResponse, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const exampleInterceptorFn: HttpInterceptorFn = (req, next) => {

  const authenticatedReq = req.clone({
    headers: new HttpHeaders({
      Authorization: `Bearer token`
    })
  });

  return next(authenticatedReq)
    .pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status == 401) {
          // Throw away token...
        }
        return throwError(() => error);
      })
    );
};
