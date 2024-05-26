/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';

import { DataService } from '../services/data/data.service';
import { AppService } from '../services/app.service';

@Injectable()
export class OperatorInterceptor implements HttpInterceptor {

  connected = true;
  user?: Record<string, any> | null;
  isCheckUpdate:boolean = true;
  attemptingRefresh: boolean = false;

  constructor(
    private appservice: AppService,
    private data: DataService
  ) {
    this.data.connected.subscribe(res=>this.connected=res);
    this.data.sessionUser.subscribe(res=>this.user=res);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.connected) throw Error('Network connection unavailable!');
    if (
      request.url.includes('backEnd') ||
      request.url.includes('googleapis.com/map') ||
      request.url.includes('firebaseio.com')
    ) return next.handle(request);
    else {
      const clone = this.appendOptions(request.clone());
      return (next.handle(clone)).pipe(
        map((event)=>this.responseCheck(event)),
        catchError((e: HttpErrorResponse) => {
          if(
            this.user &&
            !clone.url.includes('/auth') &&
            !clone.url.includes('firebaseio.com')
          ) switch(e.status) {
            case 401:
              this.appservice.logout();
            break;
            // case 403:
            //   if(!clone.url.includes('/survey/updateSurvey'))
            //   this.appservice.refreshUserSession(this.user, {next, clone});
            // break;
          }
          throw e;
        })
      );
    }
  }

  appendOptions(request: HttpRequest<unknown>) {
    let headers = request.headers;
    let clone = request.clone();
    if(
      !clone.url.includes('auth') &&
      this.appservice.appSemanticVersion
    ) {
      if(this.data?.device) headers = headers.append('Deviceinfo', JSON.stringify(this.data.device));
      headers = headers.append('Appversion',this.appservice.appSemanticVersion);
    }
    if(this.user?.['accessToken']) {
      headers = headers.append('x-access-token', this.user['accessToken']);
    }
    clone = clone.clone({
      headers
    });
    return clone;
  }

  handleBodyIn(req: HttpRequest<any>, key: string, value: string) {
    if (req.method.toLowerCase() !== 'get' && req.method.toLowerCase() !== 'delete') {
      if (req.body instanceof FormData) {
        req =  req.clone({
          body: req.body.append(key, value)
        });
      } else if (req.body instanceof Object && !(Array.isArray(req.body))) {
        const foo: Record<string, any> = {};
        foo[key] = value;
        req =  req.clone({
          body: {...req.body, ...foo}
        });
      }
    }
    return req;
  }

  responseCheck(event: HttpEvent<unknown | undefined>) {
    if(event instanceof HttpResponse) {
      const response:any = event.body;
      if(response) {
        // response.isHardUpdate = true;
        // if(response['force_update']) {
        //   this.nav.navigateRoot('auth');
        //   this.data.endUserSession();
        //   this.alert.presentAlert({
        //     header: 'Update App',
        //     message:'Please update the app to the latest version',
        //     buttons:[
        //       {
        //         text: 'Update',
        //         handler: () => {
        //           if(isPlatform('android'))
        //             {window.open('https://play.google.com/store/apps/details?id=eis.trilasoft&hl=en_IN&gl=US', '_blank');}
        //           else if (isPlatform('ios') || isPlatform('iphone') || isPlatform('ipad'))
        //             {window.open('https://apps.apple.com/us/app/eis-mobile/id1531065403', '_blank');}
        //         }
        //       }
        //     ],
        //     backdropDismiss: false
        //   });
        // }
        if (
          (
            response['status'] &&
            (
              response['status'] === 'FAILED' ||
              response['status'] === 'error'
            )
          )
        ) throw Error(response['message']?response['message']:'Network call error');
      }
    }
    return event;
  }

}
