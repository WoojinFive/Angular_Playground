import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log('Requist is one its way');
    // console.log(req.url);
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz') // keeping original header -> append
    });
    return next.handle(modifiedRequest);
    // return next.handle(modifiedRequest).pipe(tap(event => {
    //   console.log(event);
    //   if (event.type === HttpEventType.Response) {
    //     console.log('Response arrived, body date: ');
    //     console.log(event.body);
    //   }
    // }));
  }
}