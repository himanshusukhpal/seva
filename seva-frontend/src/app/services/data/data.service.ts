import { CrashlyticsService } from './../crashlytics/crashlytics.service';
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable curly */
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { CallsService } from '../networking/calls.service';
import { StorageService } from '../storage/storage.service';
import { AlertService } from '../alert/alert.service';

import { DeviceInfo } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  device?: DeviceInfo
  deviceId?: string;

  sessionUser: BehaviorSubject<Record<string, any> | null> = new BehaviorSubject<Record<string, any> | null>(null);

  connected: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private alert: AlertService,
    private store: StorageService,
    private calls: CallsService,
    private crashlytics: CrashlyticsService
  ) { }

  get timestamp() {
    // eslint-disable-next-line no-bitwise
    return new Date().getTime() / 1000 | 0;
  }

  async initUserSession(user: Record<string, any>, fetch = true) {
    try {
      await this.setUserData(user);
      await this.initializeAppData();
      if(fetch) {
        const response: Record<string, any> = await lastValueFrom(this.calls.myAccountCall());
        await this.setUserData(Object.assign({}, user, response['data']));
      }
    } catch(e) {
      console.log(e)
      this.crashlytics.recordException(e);
    }
  }
  async setUserData(user: Record<string, any>) {
    this.sessionUser.next(user);
    await this.store.setSessionUser(user);
  }

  async initializeAppData() {
    try {
    }
    catch (e) {
      this.alert.showError('Initalize app data', e);
      this.crashlytics.recordException(e);
    }
  }

  endUserSession() {
    this.sessionUser.next(null);
    this.store.removeSessionUser();
  }

}
