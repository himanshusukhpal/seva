import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.scss'],
})
export class AddressUpdateComponent implements OnInit, OnDestroy {

  @Input() address?: Record<string, any>;

  subscriptions: Subscription[] = [];

  addressForm = this.formBuilder.group({
    line1: [ null, [Validators.required] ],
    line2: [ null ],
    locality: [ null ],
    pincode: [ null, [Validators.required] ],
    city: [ null, [Validators.required] ],
    state: [ null, [Validators.required] ]
  });

  constructor(
    private appservice: AppService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    console.log(this.address);
    if(this.address?.['id']) this.addressForm.patchValue(this.address);
  }

  ionViewWillEnter() {
    this.subscriptions.push(
      this.appservice.platform.backButton.subscribeWithPriority(2,()=>this.dismiss())
    )
  }

  async updateAddress() {
    try {
      if(!this.addressForm.valid) throw Error('Invalid form input');
      console.log(this.addressForm.value);
      const call = (this.address?.['id']) ?
      this.appservice.calls.updateAddressCall(
        this.address?.['id'],
        this.addressForm.value
      ) :
      this.appservice.calls.createAddressCall(
        this.addressForm.value
      );
      const response: Record<string, any> = await lastValueFrom(call);
      this.appservice.alert.showSuccessMessage('Update address', response['message']);
      this.dismiss(response['data']);
    } catch(e) {
      await this.appservice.alert.showError('Update Address', e);
    }
  }

  dismiss(data?: Record<string, any>) {
    this.appservice.modalCtrl.dismiss(data);
  }

  ionViewWillLeave() { this.exitProcesses(); }
  ngOnDestroy() { this.exitProcesses(); }
  exitProcesses() { this.subscriptions.forEach(sub=>sub.unsubscribe()); }
}
