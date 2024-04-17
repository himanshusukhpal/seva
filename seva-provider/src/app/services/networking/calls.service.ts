/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  baseUrl = environment.serverUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  // validate(call: Observable<object>, responseSchema) {
  //   return call.pipe(
  //     map(res=>{
  //       const validation  = responseSchema.validate(res['result']);
  //       if(validation.error) throw validation.error;
  //       return res;
  //     })
  //   );
  // }

}
