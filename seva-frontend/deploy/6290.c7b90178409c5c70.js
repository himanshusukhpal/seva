"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6290],{6290:(y,c,p)=>{p.r(c),p.d(c,{ProfilePageModule:()=>j});var d=p(177),s=p(9417),o=p(7863),m=p(3314),e=p(4438),u=p(3467),f=p(467),h=p(3207);function v(r,l){1&r&&e.nrm(0,"ion-datetime",15)}function g(r,l){if(1&r&&(e.j41(0,"div",16),e.nrm(1,"div",17),e.j41(2,"form",3)(3,"ion-list")(4,"ion-list-header"),e.EFF(5," Provider Details "),e.k0s(),e.j41(6,"ion-item",4),e.nrm(7,"ion-input",18),e.k0s(),e.j41(8,"ion-item",4),e.nrm(9,"ion-input",19),e.k0s()(),e.nrm(10,"br"),e.j41(11,"fieldset",20)(12,"legend"),e.EFF(13,"Emergency Contact"),e.k0s(),e.j41(14,"ion-list")(15,"ion-item",4),e.nrm(16,"ion-input",21),e.k0s(),e.j41(17,"ion-item",4),e.nrm(18,"ion-input",22),e.k0s()()()()()),2&r){const t=e.XpG();e.R7$(),e.Y8G("ngClass",t.profileForm.controls.isProvider.value?"":"disabled-form-overlay"),e.R7$(),e.Y8G("formGroup",t.providerDetailForm)}}let P=(()=>{var r;class l{constructor(i,n){this.appservice=i,this.formBuilder=n,this.profileForm=this.formBuilder.group({name:[null,[s.k0.required]],dob:[null],email:[null],phone:[null,[s.k0.required]],aadhar:[null],isProvider:[null]}),this.providerDetailForm=this.formBuilder.group({aadhar:[null,[s.k0.required]],pan:[null,[s.k0.required]],emergencyContactName:[null],emergencyContactPhone:[null]}),this.subscriptions=[]}ionViewWillEnter(){this.subscriptions.push(this.appservice.platform.backButton.subscribeWithPriority(2,()=>this.dismiss()))}ngOnInit(){this.appservice.data.sessionUser.subscribe(i=>{var n,a;this.user=i,this.user&&(this.profileForm.patchValue(this.user),this.profileForm.value.phone&&this.profileForm.controls.phone.disable(),this.profileForm.value.dob||this.profileForm.controls.dob.setValue(new Date("1970-01-01").toISOString())),null!==(n=this.user)&&void 0!==n&&n.providerDetail&&(this.providerDetailForm.patchValue(this.user.providerDetail),null!==(a=this.user)&&void 0!==a&&a.isProvider?this.providerDetailForm.enable():this.providerDetailForm.disable())})}updateProfileDetail(){var i=this;return(0,f.A)(function*(){try{if(!i.profileForm.valid)throw Error("Invalid form input");const n=i.profileForm.value;if(i.profileForm.value.isProvider){if(!i.providerDetailForm.valid)throw Error("Provider details are required");n.providerDetail=i.providerDetailForm.value}const a=yield(0,h.s)(i.appservice.calls.updateMyAccountCall(n));i.appservice.alert.showSuccessMessage("Update profile",a.message),i.appservice.data.setUserData(Object.assign(i.user||{},a.data)),i.dismiss()}catch(n){yield i.appservice.alert.showError("Update Profile",n)}})()}dismiss(){this.appservice.modalCtrl.dismiss()}ionViewWillLeave(){this.exitProcesses()}ngOnDestroy(){this.exitProcesses()}exitProcesses(){this.subscriptions.forEach(i=>i.unsubscribe())}}return(r=l).\u0275fac=function(i){return new(i||r)(e.rXU(u.d),e.rXU(s.ze))},r.\u0275cmp=e.VBU({type:r,selectors:[["app-profile-update"]],decls:31,vars:3,consts:[["slot","end"],[3,"click"],["slot","icon-only","name","close"],[3,"formGroup"],["lines","none"],["label","Name","formControlName","name","errorText","Valid name is required"],[1,"item-padded"],["slot","start"],["datetime","dob-datetime"],[3,"keepContentsMounted"],["label","Email","formControlName","email","errorText","Valid email is required"],["label","Phone","formControlName","phone","errorText","Valid phone is required"],["formControlName","isProvider",3,"ionChange"],["class","provider-detail-container",4,"ngIf"],["expand","block",3,"click"],["id","dob-datetime","presentation","date","formControlName","dob"],[1,"provider-detail-container"],[3,"ngClass"],["label","Aadhar","formControlName","aadhar","errorText","Invalid aadhar input"],["label","PAN","formControlName","pan","errorText","Invalid pan input"],[2,"margin","0 10px 0 10px"],["label","Name","formControlName","emergencyContactName","errorText","Invalid emergency contact name"],["label","Phone","formControlName","emergencyContactPhone","errorText","Invalid emergency contact number"]],template:function(i,n){1&i&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.EFF(3," Edit Profile "),e.k0s(),e.j41(4,"ion-buttons",0)(5,"ion-button",1),e.bIt("click",function(){return n.dismiss()}),e.nrm(6,"ion-icon",2),e.k0s()()()(),e.j41(7,"ion-content")(8,"form",3)(9,"ion-list")(10,"ion-item",4),e.nrm(11,"ion-input",5),e.k0s(),e.j41(12,"ion-item",6)(13,"span",7),e.EFF(14," D.O.B "),e.k0s(),e.nrm(15,"ion-datetime-button",8),e.j41(16,"ion-modal",9),e.DNE(17,v,1,0,"ng-template"),e.k0s()(),e.j41(18,"ion-item",4),e.nrm(19,"ion-input",10),e.k0s(),e.j41(20,"ion-item",4),e.nrm(21,"ion-input",11),e.k0s(),e.nrm(22,"br"),e.j41(23,"ion-item",4)(24,"ion-checkbox",12),e.bIt("ionChange",function(E){return E.detail.checked?n.providerDetailForm.enable():n.providerDetailForm.disable()}),e.EFF(25," Register as a provider "),e.k0s()()()(),e.DNE(26,g,19,2,"div",13),e.k0s(),e.j41(27,"ion-footer")(28,"ion-toolbar")(29,"ion-button",14),e.bIt("click",function(){return n.updateProfileDetail()}),e.EFF(30," Update "),e.k0s()()()),2&i&&(e.R7$(8),e.Y8G("formGroup",n.profileForm),e.R7$(8),e.Y8G("keepContentsMounted",!0),e.R7$(10),e.Y8G("ngIf",null==n.user?null:n.user.providerDetail.id))},dependencies:[d.YU,d.bT,s.qT,s.BC,s.cb,s.j4,s.JD,o.Jm,o.QW,o.eY,o.W9,o.A9,o.K4,o.M0,o.eU,o.iq,o.$w,o.uz,o.nf,o.AF,o.BC,o.ai,o.Sb,o.hB,o.Je,o.Gw],styles:[".provider-detail-container[_ngcontent-%COMP%]{position:relative;padding-bottom:25px}.disabled-form-overlay[_ngcontent-%COMP%]{pointer-events:none;position:absolute;width:100%;height:100%;z-index:2;background-color:#f4f4f4;opacity:.4}"]}),l})();function b(r,l){if(1&r){const t=e.RV6();e.j41(0,"ion-list")(1,"ion-item",19),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.appservice.logout())}),e.j41(2,"ion-label",20)(3,"b"),e.EFF(4," Logout "),e.k0s()(),e.nrm(5,"ion-icon",21),e.k0s(),e.j41(6,"ion-item",22)(7,"ion-label",20)(8,"b"),e.EFF(9," Settings "),e.k0s()(),e.nrm(10,"ion-icon",23),e.k0s()()}}function F(r,l){if(1&r){const t=e.RV6();e.j41(0,"ion-list")(1,"ion-list-header"),e.EFF(2," My Provider Details "),e.k0s(),e.j41(3,"ion-item",14),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.appservice.navRootForward("skills"))}),e.nrm(4,"ion-icon",15),e.j41(5,"ion-label"),e.EFF(6," Skills "),e.j41(7,"ion-card-subtitle",16),e.EFF(8," Share, Edit, and Add Skills "),e.k0s()()(),e.j41(9,"ion-item",14),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.appservice.navRootForward("clients"))}),e.nrm(10,"ion-icon",15),e.j41(11,"ion-label"),e.EFF(12," Clients "),e.j41(13,"ion-card-subtitle",16),e.EFF(14," List of clients "),e.k0s()()()()}}function k(r,l){1&r&&e.nrm(0,"app-profile-update",24)}const _=[{path:"",component:(()=>{var r;class l{constructor(i,n){this.appservice=i,this.formBuilder=n,this.profileForm=this.formBuilder.group({name:[null,[s.k0.required]],dob:[null],email:[null],phone:[null,[s.k0.required]],aadhar:[null],pan:[null],emergencyContactName:[null],emergencyContactPhone:[null]}),this.subscriptions=[]}ngOnInit(){this.subscriptions.push(this.appservice.data.sessionUser.subscribe(i=>this.user=i))}ionViewWillEnter(){this.subscriptions.push(this.appservice.platform.backButton.subscribeWithPriority(1,()=>this.navBack()))}navBack(){this.appservice.navRootBack(""),this.exitProcesses()}ionViewWillLeave(){this.exitProcesses()}ngOnDestroy(){this.exitProcesses()}exitProcesses(){this.subscriptions.forEach(i=>i.unsubscribe())}}return(r=l).\u0275fac=function(i){return new(i||r)(e.rXU(u.d),e.rXU(s.ze))},r.\u0275cmp=e.VBU({type:r,selectors:[["app-profile"]],decls:48,vars:7,consts:[[3,"translucent"],["slot","end"],["fill","undefined","shape","round","id","profile-menu"],["slot","icon-only","name","ellipsis-vertical"],["trigger","profile-menu","dismissOnSelect","true"],[3,"fullscreen"],["collapse","condense"],["size","large"],["size","8"],["id","edit-profile",2,"padding","5px","font-size","large","box-shadow","2px 2px 4px #878787"],["name","pencil"],["size","4",2,"display","flex"],[1,"profile-avatar"],["alt","Profile","src","https://ionicframework.com/docs/img/demos/avatar.svg"],[3,"click"],["slot","end","name","chevron-forward"],["mode","md"],[4,"ngIf"],["trigger","edit-profile",3,"keepContentsMounted"],["lines","none",3,"click"],["slot","start"],["size","large","slot","end","name","power"],["lines","none"],["size","large","slot","end","name","settings"],[2,"height","calc(100% - 113px)"]],template:function(i,n){1&i&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Profile"),e.k0s(),e.j41(4,"ion-buttons",1)(5,"ion-button",2),e.nrm(6,"ion-icon",3),e.k0s()(),e.j41(7,"ion-popover",4),e.DNE(8,b,11,0,"ng-template"),e.k0s()()(),e.j41(9,"ion-content",5)(10,"ion-header",6)(11,"ion-toolbar")(12,"ion-title",7),e.EFF(13," Profile "),e.k0s()()(),e.j41(14,"ion-grid")(15,"ion-row")(16,"ion-col",8)(17,"p"),e.EFF(18),e.nrm(19,"br"),e.EFF(20),e.nrm(21,"br"),e.EFF(22),e.k0s(),e.j41(23,"button",9),e.EFF(24," Edit Profile "),e.nrm(25,"ion-icon",10),e.k0s()(),e.j41(26,"ion-col",11)(27,"ion-avatar",12),e.nrm(28,"img",13),e.k0s()()()(),e.j41(29,"ion-list")(30,"ion-list-header"),e.EFF(31," My Details "),e.k0s(),e.j41(32,"ion-item",14),e.bIt("click",function(){return n.appservice.navRootForward("addresses")}),e.nrm(33,"ion-icon",15),e.j41(34,"ion-label"),e.EFF(35," Addresses "),e.j41(36,"ion-card-subtitle",16),e.EFF(37," Share, Edit, and Add Addresses "),e.k0s()()(),e.j41(38,"ion-item",14),e.bIt("click",function(){return n.appservice.navRootForward("providers")}),e.nrm(39,"ion-icon",15),e.j41(40,"ion-label"),e.EFF(41," Providers "),e.j41(42,"ion-card-subtitle",16),e.EFF(43," Share, Edit, and Add Providers "),e.k0s()()()(),e.nrm(44,"br"),e.DNE(45,F,15,0,"ion-list",17),e.k0s(),e.j41(46,"ion-modal",18),e.DNE(47,k,1,0,"ng-template"),e.k0s()),2&i&&(e.Y8G("translucent",!0),e.R7$(9),e.Y8G("fullscreen",!0),e.R7$(9),e.SpI(" ",null==n.user?null:n.user.name," "),e.R7$(2),e.SpI(" ",null==n.user?null:n.user.phone," "),e.R7$(2),e.SpI(" ",null==n.user?null:n.user.email," "),e.R7$(23),e.Y8G("ngIf",null==n.user?null:n.user.isProvider),e.R7$(),e.Y8G("keepContentsMounted",!0))},dependencies:[d.bT,o.mC,o.Jm,o.QW,o.HW,o.hU,o.W9,o.lO,o.eU,o.iq,o.uz,o.he,o.nf,o.AF,o.ln,o.BC,o.ai,o.Sb,o.CF,P],styles:[".profile-avatar[_ngcontent-%COMP%]{width:100px;height:100px;margin:auto}.provider-profile-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{height:200px}.provider-profile-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{text-align:center;border:1px solid grey}.provider-profile-grid[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{position:absolute;top:50%;transform:translate(-50%,-50%);font-size:50px}"]}),l})()}];let C=(()=>{var r;class l{}return(r=l).\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.$C({type:r}),r.\u0275inj=e.G2t({imports:[m.iI.forChild(_),m.iI]}),l})(),j=(()=>{var r;class l{}return(r=l).\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.$C({type:r}),r.\u0275inj=e.G2t({imports:[d.MD,s.YN,s.X1,o.bv,C]}),l})()}}]);