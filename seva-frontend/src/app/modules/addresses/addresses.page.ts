import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { IonRefresherCustomEvent } from '@ionic/core';
import { RefresherEventDetail } from '@ionic/angular';

import { Subscription } from 'rxjs/internal/Subscription';

import { AppService } from 'src/app/services/app.service';
import { lastValueFrom } from 'rxjs';
import { AddressUpdateComponent } from './address-update/address-update.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnDestroy {

  @ViewChild('addressUpdateModal') addressUpdateModal!: ElementRef<HTMLIonModalElement>;
  subscriptions: Subscription[] = [];
  addresses: any[] = [];

  constructor(
    private appservice: AppService
  ) {
    this.refreshPage();
  }

  // ngOnInit() { }

  ionViewWillEnter() {
    this.subscriptions.push(
      this.appservice.platform.backButton.subscribeWithPriority(1,()=>this.navBack())
    )
  }

  async refreshPage(event?: IonRefresherCustomEvent<RefresherEventDetail>) {
    try {
      this.addresses = (await lastValueFrom(
        this.appservice.calls.getAddressesCall()
      ) as Record<string, any>)['data'] || [];
      console.log(this.addresses);
      event?.detail.complete();
    } catch(e) {
      event?.detail.complete();
      this.appservice.alert.showError('Refresh', e);
    }
  }

  async updateAddress(address: Record<string, any>) {
    const addressUpdateModal = await this.appservice.modalCtrl.create({
      component: AddressUpdateComponent,
      componentProps: {
        address
      }
    });
    await addressUpdateModal.present();
    const data = (await addressUpdateModal.onDidDismiss()).data;
    if(data) this.refreshPage();
  }

  navBack() {
    this.appservice.navRootBack('profile');
    this.exitProcesses();
  }

  ionViewWillLeave() { this.exitProcesses(); }
  ngOnDestroy() { this.exitProcesses(); }
  exitProcesses() { this.subscriptions.forEach(sub=>sub.unsubscribe()); }

}
