/* eslint-disable max-len */
import { Injectable } from '@angular/core';

import { Base64Service } from './../base64/base64.service';

import { AlertService } from '../alert/alert.service';

import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private alert: AlertService,
    private base64: Base64Service
  ) { }

  setLang = async (lang: string) => await this.set('language', lang);
  getLang = async () => await this.get('language');
  removeLang = async () => await this.remove('language');

  setSessionUser = async (user: Record<string, any>) => await this.set('sessionUser', JSON.stringify(user));
  getSessionUser = async () => JSON.parse(await this.get('sessionUser') || 'null');
  removeSessionUser = async () => await this.remove('sessionUser');

  private async set(key: string, val: string) {
    try {
      if(val) return await Preferences.set({key, value: this.base64.encode(val)})
      else return null;
    } catch(e) {
      this.alert.showError('Set', e);
      throw e;
    }
  }
  private async get(key: string) {
    const value = (await Preferences.get({ key })).value;
    try {
      if (value) return this.base64.decode(value);
      else return null;
    } catch(e) {
      this.alert.showError('Get', e);
      throw e;
    }
  };
  private async remove(key: string) {
    try {
      return await Preferences.remove({ key });
    } catch(e) {
      this.alert.showError('Remove', e);
      throw e;
    }
  }

}
