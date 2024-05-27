/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

  baseUrl = environment.serverUrl + '/api';

  constructor(
    private http: HttpClient,
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

  loginCall = (payload: Record<string, any>) => this.http.post(`${this.baseUrl}/auth/sign`, payload);

  myAccountCall = () => this.http.get(`${this.baseUrl}/account`);

}
