import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';

import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user?: Record<string, any> | null;

  constructor(
    public appservice: AppService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.appservice.data.sessionUser.subscribe(res=>this.user=res)
    )
  }

  ionViewWillLeave() { this.exitProcesses(); }
  ngOnDestroy() { this.exitProcesses(); }
  exitProcesses() { this.subscriptions.forEach(sub=>sub.unsubscribe()); }

}
