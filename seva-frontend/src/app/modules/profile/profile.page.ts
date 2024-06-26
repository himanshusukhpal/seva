import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  profileForm = this.formBuilder.group({
    name: [ null, [Validators.required] ],
    dob: [ null ],
    email: [ null ],
    phone: [ null, [Validators.required] ],
    aadhar: [ null ],
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
    this.subscriptions.push(
      this.appservice.data.sessionUser.subscribe(res=>this.user=res)
    )
  }

  ionViewWillEnter() {
    this.subscriptions.push(
      this.appservice.platform.backButton.subscribeWithPriority(1,()=>this.navBack())
    )
  }

  navBack() {
    this.appservice.navRootBack('');
    this.exitProcesses();
  }

  ionViewWillLeave() { this.exitProcesses(); }
  ngOnDestroy() { this.exitProcesses(); }
  exitProcesses() { this.subscriptions.forEach(sub=>sub.unsubscribe()); }

}
