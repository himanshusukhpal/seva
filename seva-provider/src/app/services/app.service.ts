import sevaProvider from 'package.json';

import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  NavController,
  ModalController,
  LoadingController,
  Platform,
} from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

import { DataService } from './data/data.service';
import { CallsService } from './networking/calls.service';
import { StorageService } from './storage/storage.service';
import { AlertService } from './alert/alert.service';

import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';

import { environment } from 'src/environments/environment';

export interface failedCall {
  next: HttpHandler,
  clone: HttpRequest<unknown>
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isLoggedIn: boolean = false;
  tokenRefreshed = false;
  failedCalls: failedCall[] = [];
  title = 'Seva';

  constructor(
    public router: Router,
    public data: DataService,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public store: StorageService,
    public alert: AlertService,
    public nav: NavController,
    public platform: Platform,
    public calls: CallsService,
    // public analytics: AnalyticsService,
    // public crashlytics: CrashlyticsService,
    public translate: TranslateService,
  ) { }

  get appVersion() {
    return `${sevaProvider.version} ${(environment.production)?'':'(qa)'}`;
  }

  get appSemanticVersion() {
    return sevaProvider.version;
  }

  get appDateFormat() {
    return 'MMM dd, YYYY';
  }

  initialize() {
    this.setCurrentNetworkStatus();
    this.resetAppListeners();
    // this.initTranslate();
  }

  setCurrentNetworkStatus() {
    Network.getStatus().then(status=>this.data.connected.next(status.connected));
  }
  resetAppListeners() {
    App.removeAllListeners();
    Network.removeAllListeners();
    Network.addListener('networkStatusChange', (status) => this.data.connected.next(status.connected));
  }

  // async initTranslate() {
  //   try {
  //     let setLang = await this.store.getLang();
  //     if(!setLang) setLang = 'en';
  //     const lang = languages.find((language: Record<string, any>)=>language['locale']===setLang);
  //     if(lang) {
  //       this.translate.setTranslation(lang.locale, lang.translations);
  //       this.translate.use(setLang);
  //       this.data.appLanguageSync(setLang);
  //     } else throw Error('Last preferred language translations not found');
  //   }
  //   catch (e) {
  //     console.log(e);
  //     this.alert.showError('Init Translate', e);
  //     this.translate.setTranslation(
  //       languages[0].locale,
  //       languages[0].translations
  //     );
  //     this.translate.use(languages[0].locale);
  //     this.data.appLanguageSync(languages[0].locale);
  //   }
  // }

  async setContext() {
    try {
      this.data.device = await Device.getInfo();
      this.data.deviceId = (await Device.getId()).identifier;
      if(this.data.device.platform!=='web') {
        StatusBar.setStyle({
          style: Style.Light
        });
        StatusBar.setBackgroundColor({
          color: '#cd3c3d'
        });
      }
    } catch(e) {
      console.log(e);
    } finally {
      // this.getPresentLocation(true);
      // this.setAnalytics()
    }
  }
  // async setAnalytics() {
  //   try {
  //     if(this.data.device?.platform==='web') {
  //       this.crashlytics.isWeb = true;
  //       this.analytics.initFirebase(environment.firebaseWebConfig).then();
  //     }
  //     else {
  //       await this.crashlytics.setEnabled(true);
  //       await this.crashlytics.sendUnsentReports();
  //       this.crashlytics.deleteUnsentReports();
  //     }
  //   } catch (e) {
  //     this.alert.showError('Set Analytics', e);
  //     this.crashlytics.recordException(e);
  //   }
  // }

  changeLanguageCtrl(locale: string, translations?: Record<string, any>) {
    if(translations) this.translate.setTranslation(locale, translations);
    this.translate.use(locale);
    // this.data.appLanguageSync(locale);
  };

  getLanguageFlagIconSrc(language: string) {
    switch(language) {
      case 'es' : return 'assets/images/flags/TR.svg';
      case 'en' : return 'assets/images/flags/US.svg';
      default : return 'assets/images/flags/US.svg';
    }
  }

  changeDate(date: Date | string, format: string = this.appDateFormat) {
    try {
      return formatDate(date, format, 'en-US');
    } catch (e) {
      if(typeof date === 'string') return date;
      else return date.toString();
    }
  }

  async presentLoading(msg: string, duration: number | null = 5000) {
    const loading = await this.loadCtrl.create({
      message: msg
    });
    if(duration) loading['duration'] = duration
    await loading.present();
  }
  dismissLoading = async () => (document.getElementsByTagName('ion-loading').length)? await this.loadCtrl.dismiss() : null;

  navRootForward = (path: string) => this.nav.navigateRoot(path, { animated: true, animationDirection: 'forward' });
  navRootBack = (path: string) => this.nav.navigateRoot(path, { animated: true, animationDirection: 'back' });

  getUserFromUrlParams() {
    // const token = window.location.href.split('&userdata')[0].split('token=')[1];
    // const userInfo = window.location?.href?.split('&userdata=')[1];
    // let userData = {};
    // if(userInfo) {
    //   userData = JSON.parse(decodeURIComponent(userInfo));
    // }
    // if(token && Object.keys(userData)?.length) {
    //   return {
    //     ...userData,
    //     access_token: token
    //   };
    // }
    const urlParams = new URLSearchParams(window.location.search);
    let accessToken = urlParams.get('token');
    let refreshToken = urlParams.get('refreshToken')
    if(accessToken && refreshToken) {
      return {
        accessToken,
        refreshToken
      }
    }
    else return null;
  }

  async checkUserExist() {
    try {
      let user = this.getUserFromUrlParams();
      if(!user) user = await this.store.getSessionUser();
      if(user) this.logUserIn(user, 'restore');
      else this.logout();
    }
    catch (e) {
      this.alert.showError('Check Sessioned User', e);
      // this.crashlytics.recordException(e);
      this.logout();
    }
  }

  async logUserIn(user: Record<string, any>, sessionType: 'new' | 'restore' = 'new') {
    this.isLoggedIn = true;
    this.data.initUserSession(user);
    // this.analytics.logEvent('StartSession');
    // if(sessionType==='restore') {

    // }
    // this.data.syncAppData();
    if(sessionType==='new') this.navRootForward('');
    // const userId = user?.['userInfo']?.[0]?.['id']||'MalfunctioningUser';
    // this.analytics.setUserId(userId);
    // if(this.data.device?.platform!=='web') this.crashlytics.setUserId(userId);
  }

  async logout() {
    try {
      // if(announce) await this.presentLoading('Signing out...');
      this.isLoggedIn = false;
      // this.analytics.logEvent('Logout');
      this.data.endUserSession();
      this.navRootBack('auth');
      await this.dismissLoading();
    } catch (e) {
      this.failedCalls = [];
      this.data.endUserSession();
      this.navRootBack('auth');
      await this.dismissLoading();
      // this.crashlytics.recordException(e);
    }
  }
  isSessionExpired(user: Record<string, any>) {
    const getExpiryInHours = (miliSecs: number) => {
      try {
        const hrs = ((miliSecs/1000)/60)/60;
        return hrs ? hrs : 22;
      } catch (e) {
        return 22;
      }
    }
    if (user['accessTokenRefreshedAt']) {
      const hours = Math.abs(new Date().getTime() - new Date(user['accessTokenRefreshedAt']).getTime()) / 36e5;
      const expiryHours = user['expires'] ? getExpiryInHours(user['expires']) : 22;
      if (hours < expiryHours) return false;
      return true;
    }
    else return false;
  }

  // async searchModal(
  //   list: any[],
  //   formControl: FormControl | null = null,
  //   key: string,
  //   setModel?: any
  // ) {
  //   let val;
  //   const modal = await this.modalCtrl.create({
  //     component: CustomSearchComponent,
  //     cssClass: 'select-modal',
  //     componentProps: {
  //       list,
  //       key
  //     },
  //     // mode: 'ios'
  //   })
  //   await modal.present();
  //   await modal.onDidDismiss().then(selectedItem => {
  //     val = selectedItem.data ? selectedItem.data[key] : (formControl?.value ? (setModel ? setModel : null) : null)
  //     if(val && formControl) formControl.setValue(val)
  //     else if (setModel) setModel = val;
  //   });
  //   return list.filter(el => el[key] === val);
  // }

  dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  // countryToISO2Code(countryName: string) {
  //   return countryToISO31661Alpha2Code[countryName];
  // }
  // getCountryDetails(iso31661Alpha2Code: string) {
  //   return countryDetails[iso31661Alpha2Code];
  // }

}
