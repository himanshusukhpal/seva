import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  profileForm = this.formBuilder.group({
    name: [ null, [Validators.required] ],
    phone: [ {value: null, disabled: true}, [Validators.required] ],
    dob: [ null, [Validators.required] ],
    aadhar: [ null, [Validators.required] ],
    pan: [ null ],
    emergencyContactName: [ null ],
    emergencyContactPhone: [ null ],
  });
  subscriptions: Subscription[] = [];
  user?: Record<string, any> | null;

  constructor(
    public appservice: AppService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.appservice.data.sessionUser.subscribe(res=>this.user=res);
    if(this.user) this.profileForm.patchValue(this.user);
  }

  async updateProfile() {
    try {
      if(!this.profileForm.valid) throw Error('Invalid form input');
      // const response: Record<string, any> = await this.appservice.calls.
    } catch(e) {
      await this.appservice.alert.showError('Update Profile', e);
    }
  }

  ionViewWillLeave() { this.exitProcesses(); }
  ngOnDestroy() { this.exitProcesses(); }
  exitProcesses() { this.subscriptions.forEach(sub=>sub.unsubscribe()); }

}
