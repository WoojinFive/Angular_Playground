import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // http request 가 있을때마다 중간에서 가로체서 data 가공하는것
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1), //take(1) : I only want to take one value from the observable and thereafter, it should automatically unsubscribe
      exhaustMap(user => {
        //user observable 먼저 실행하고 내부에 있는 http observable 실행함. 그때 map, tap도 실행됨

        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
