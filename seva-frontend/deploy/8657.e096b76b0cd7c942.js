"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8657],{8657:(v,l,n)=>{n.r(l),n.d(l,{ClientsPageModule:()=>C});var c=n(177),u=n(9417),i=n(7863),r=n(3314),e=n(4438),p=n(3467);const g=[{path:"",component:(()=>{var t;class o{constructor(s){this.appservice=s,this.subscriptions=[]}ngOnInit(){this.subscriptions.push(this.appservice.data.sessionUser.subscribe(s=>this.user=s))}ionViewWillEnter(){this.subscriptions.push(this.appservice.platform.backButton.subscribeWithPriority(1,()=>this.navBack()))}navBack(){this.appservice.navRootBack("profile"),this.exitProcesses()}ionViewWillLeave(){this.exitProcesses()}ngOnDestroy(){this.exitProcesses()}exitProcesses(){this.subscriptions.forEach(s=>s.unsubscribe())}}return(t=o).\u0275fac=function(s){return new(s||t)(e.rXU(p.d))},t.\u0275cmp=e.VBU({type:t,selectors:[["app-clients"]],decls:12,vars:2,consts:[[3,"translucent"],["slot","start"],[3,"click"],["slot","icon-only","name","arrow-back"],[3,"fullscreen"],["collapse","condense"],["size","large"]],template:function(s,d){1&s&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",2),e.bIt("click",function(){return d.navBack()}),e.nrm(4,"ion-icon",3),e.k0s()(),e.j41(5,"ion-title"),e.EFF(6,"My Clients"),e.k0s()()(),e.j41(7,"ion-content",4)(8,"ion-header",5)(9,"ion-toolbar")(10,"ion-title",6),e.EFF(11,"My Clients"),e.k0s()()()()),2&s&&(e.Y8G("translucent",!0),e.R7$(7),e.Y8G("fullscreen",!0))},dependencies:[i.Jm,i.QW,i.W9,i.eU,i.iq,i.BC,i.ai]}),o})()}];let h=(()=>{var t;class o{}return(t=o).\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[r.iI.forChild(g),r.iI]}),o})(),C=(()=>{var t;class o{}return(t=o).\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[c.MD,u.YN,i.bv,h]}),o})()}}]);