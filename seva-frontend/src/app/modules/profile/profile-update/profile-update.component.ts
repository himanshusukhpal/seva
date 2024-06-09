import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {

  profileForm = this.formBuilder.group({
    name: [ null, [Validators.required] ],
    dob: [ null ],
    email: [ null ],
    phone: [ null, [Validators.required] ],
    aadhar: [ null ],
    isProvider: [ null ]
  });
  providerDetailForm = this.formBuilder.group({
    aadhar: [ null, [Validators.required] ],
    pan: [ null, [Validators.required] ],
    emergencyContactName: [ null ],
    emergencyContactPhone: [ null ]
  });
  subscriptions: Subscription[] = [];
  user?: Record<string, any> | null;

  constructor(
    private appservice: AppService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ionViewWillEnter() {
    this.subscriptions.push(
      this.appservice.platform.backButton.subscribeWithPriority(2,()=>this.dismiss())
    )
  }

  ngOnInit() {
    this.appservice.data.sessionUser.subscribe(res=> {
      this.user=res;
      if(this.user) {
        this.profileForm.patchValue(this.user);
        if(this.profileForm.value.phone)
          this.profileForm.controls['phone'].disable();
        if(!this.profileForm.value.dob)
          this.profileForm.controls['dob'].setValue((new Date('1970-01-01')).toISOString())
      }
      if(this.user?.['providerDetail']) this.providerDetailForm.patchValue(this.user['providerDetail']);
    });
  }

  async updateProfileDetail() {
    try {
      if(!this.profileForm.valid) throw Error('Invalid form input');
      const payload: Record<string, any> = this.profileForm.value;
      if(this.profileForm.value.isProvider) {
        if(!this.providerDetailForm.valid) throw Error('Provider details are required');
        payload['providerDetail'] = this.providerDetailForm.value;
      }
      const response: Record<string, any> = await lastValueFrom(
        this.appservice.calls.updateMyAccountCall(payload)
      );
      this.appservice.alert.showSuccessMessage('Update profile', response['message']);
      this.appservice.data.setUserData(Object.assign(
        this.user || {},
        response['data']
      ));
      this.dismiss();
    } catch(e) {
      await this.appservice.alert.showError('Update Profile', e);
    }
  }

  dismiss() {
    this.appservice.modalCtrl.dismiss();
  }

  ionViewWillLeave() { this.exitProcesses(); }
  ngOnDestroy() { this.exitProcesses(); }
  exitProcesses() { this.subscriptions.forEach(sub=>sub.unsubscribe()); }
}
