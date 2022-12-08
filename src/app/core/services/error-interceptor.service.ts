import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private router:Router) {}

  private buidMessage(errorMessage :string,status : number) : string{
    return "ERROR " + status +". " + errorMessage +" \n ";
  }
  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
      return next.handle(request)
          .pipe(
              retry(3),
              catchError((error: HttpErrorResponse) => {
                  let errorMessage : String = '';
                  if (error.error instanceof ErrorEvent) {
                      // erreur client
                      errorMessage = `Error was occured` + error.message;

                  } else {
                    // erreur serveur
                    switch (error.status) {
                      case 401:     
                        errorMessage = this.buidMessage("Unauthorized acces",error.status);
                        break;
                      case 403:
                        errorMessage = this.buidMessage("Unauthorized acces",error.status);
                        break;                        
                      case 404:
                        errorMessage = this.buidMessage("Ressource not found.",error.status);
                        break;
                      case 500:
                        errorMessage =this.buidMessage("Internal server error.",error.status);
                        break;
                      default :
                        errorMessage = this.buidMessage("Unexpected error has occurred.",error.status);

 
                    }
                     
                  }
                  this.router.navigateByUrl('/error', { state: {data : errorMessage}  });

                  return throwError( () =>errorMessage);
              })
          )
  }
}
