"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7396],{7396:(b,u,t)=>{t.r(u),t.d(u,{ProfilePageModule:()=>h});var c=t(177),r=t(9417),i=t(7863),m=t(3314),f=t(467),e=t(4438),d=t(3467);const p=[{path:"",component:(()=>{var o;class a{constructor(n,l){this.appservice=n,this.formBuilder=l,this.profileForm=this.formBuilder.group({name:[null,[r.k0.required]],phone:[{value:null,disabled:!0},[r.k0.required]],dob:[null,[r.k0.required]],aadhar:[null,[r.k0.required]],pan:[null],emergencyContactName:[null],emergencyContactPhone:[null]}),this.subscriptions=[]}ngOnInit(){this.appservice.data.sessionUser.subscribe(n=>this.user=n),this.user&&this.profileForm.patchValue(this.user)}updateProfileDetail(){var n=this;return(0,f.A)(function*(){try{if(!n.profileForm.valid)throw Error("Invalid form input")}catch(l){yield n.appservice.alert.showError("Update Profile",l)}})()}ionViewWillLeave(){this.exitProcesses()}ngOnDestroy(){this.exitProcesses()}exitProcesses(){this.subscriptions.forEach(n=>n.unsubscribe())}}return(o=a).\u0275fac=function(n){return new(n||o)(e.rXU(d.d),e.rXU(r.ze))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-profile"]],decls:31,vars:4,consts:[[3,"translucent"],["slot","end"],["fill","undefined","shape","round",3,"click"],["slot","icon-only","name","power"],[3,"fullscreen"],["collapse","condense"],["size","large"],[3,"ngSubmit","formGroup"],["lines","none"],["label","Name","formControlName","name","errorText","Valid name is required"],["label","Phone","formControlName","phone","errorText","Valid phone is required",3,"disabled"],["label","D.O.B","formControlName","dob","errorText","Invalid DOB input"],["label","Aadhar","formControlName","aadhar","errorText","Invalid aadhar input"],["label","PAN","formControlName","pan","errorText","Invalid pan input"],["label","Emergency Contact Name","formControlName","emergencyContactName","errorText","Invalid emergency contact name"],["label","Emergency Contact Phone","formControlName","emergencyContactPhone","errorText","Invalid emergency contact number"],["expand","block","type","submit"]],template:function(n,l){1&n&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Profile"),e.k0s(),e.j41(4,"ion-buttons",1)(5,"ion-button",2),e.bIt("click",function(){return l.appservice.logout()}),e.nrm(6,"ion-icon",3),e.k0s()()()(),e.j41(7,"ion-content",4)(8,"ion-header",5)(9,"ion-toolbar")(10,"ion-title",6),e.EFF(11,"Profile"),e.k0s()()(),e.j41(12,"form",7),e.bIt("ngSubmit",function(){return l.updateProfileDetail()}),e.j41(13,"ion-list")(14,"ion-item",8),e.nrm(15,"ion-input",9),e.k0s(),e.j41(16,"ion-item",8),e.nrm(17,"ion-input",10),e.k0s(),e.j41(18,"ion-item",8),e.nrm(19,"ion-input",11),e.k0s(),e.j41(20,"ion-item",8),e.nrm(21,"ion-input",12),e.k0s(),e.j41(22,"ion-item",8),e.nrm(23,"ion-input",13),e.k0s(),e.j41(24,"ion-item",8),e.nrm(25,"ion-input",14),e.k0s(),e.j41(26,"ion-item",8),e.nrm(27,"ion-input",15),e.k0s(),e.j41(28,"ion-item")(29,"ion-button",16),e.EFF(30," Update "),e.k0s()()()()()),2&n&&(e.Y8G("translucent",!0),e.R7$(7),e.Y8G("fullscreen",!0),e.R7$(5),e.Y8G("formGroup",l.profileForm),e.R7$(5),e.Y8G("disabled",!(null==l.user||!l.user.phone)))},dependencies:[r.qT,r.BC,r.cb,r.j4,r.JD,i.Jm,i.QW,i.W9,i.eU,i.iq,i.$w,i.uz,i.nf,i.BC,i.ai,i.Gw]}),a})()}];let P=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[m.iI.forChild(p),m.iI]}),a})(),h=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[c.MD,r.YN,r.X1,i.bv,P]}),a})()}}]);