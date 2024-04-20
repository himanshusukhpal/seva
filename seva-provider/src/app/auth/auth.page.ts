import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { AppService } from '../services/app.service';

import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  loginForm = this.formBuilder.group({
    phone: [null, [Validators.required]]
  })

  constructor(
    public appservice: AppService,
    private formBuilder: UntypedFormBuilder
  ) { }

  async submitLogin() {
    try {
      if(!this.loginForm.valid) throw Error('Mobile number is required');
      const response: Record<string, any> = await lastValueFrom(this.appservice.calls.loginCall(this.loginForm.value));
      this.appservice.logUserIn(response['data']);
    } catch(e) {
      this.appservice.alert.showError('Login', e)
    }
  }

}
