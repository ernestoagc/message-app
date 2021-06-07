import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'
@Injectable()
export class ValidationInterceptor implements HttpInterceptor {

    constructor(){}


    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> { 
     return next.handle(req).pipe(
        catchError(e=>{

            if(e.status ==500 || e.status ==504  ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'error',
                    title: 'It was a system problem',
                    text: 'Please contact the administrator',
                    footer: detalleError
                  });
            } else if(e.status ==404 ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'info',
                    title: 'It was a problem.',
                    text: detalleError
                  });
            }if(e.status ==400 ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'error',
                    title: 'It was a problem.',
                    text: detalleError
                  });
            }

            return throwError(e);
        })
     );
    }
}