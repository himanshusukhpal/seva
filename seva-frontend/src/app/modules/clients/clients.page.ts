import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user?: Record<string, any> | null;

  constructor(
    private appservice: AppService
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
    this.appservice.navRootBack('profile');
    this.exitProcesses();
  }

  ionViewWillLeave() { this.exitProcesses(); }
  ngOnDestroy() { this.exitProcesses(); }
  exitProcesses() { this.subscriptions.forEach(sub=>sub.unsubscribe()); }

}
