"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5067],{5067:(A,l,i)=>{i.r(l),i.d(l,{AuthPageModule:()=>v});var p=i(177),a=i(9417),n=i(4488),m=i(3314),d=i(467),c=i(3207),o=i(4438),g=i(3467);const h=[{path:"",component:(()=>{var t;class u{constructor(e,r){this.appservice=e,this.formBuilder=r,this.loginForm=this.formBuilder.group({phone:[null,[a.k0.required]]})}submitLogin(){var e=this;return(0,d.A)(function*(){try{if(!e.loginForm.valid)throw Error("Mobile number is required");const r=yield(0,c.s)(e.appservice.calls.loginCall(e.loginForm.value));e.appservice.logUserIn(r.data)}catch(r){e.appservice.alert.showError("Login",r)}})()}}return(t=u).\u0275fac=function(e){return new(e||t)(o.rXU(g.d),o.rXU(a.ze))},t.\u0275cmp=o.VBU({type:t,selectors:[["app-auth"]],decls:19,vars:4,consts:[[1,"container-center","ion-text-center"],["name","home-outline",2,"font-size","70px"],[2,"font-size","30px"],[2,"font-size","20px"],[2,"padding","15px 5px 10px 5px"],[3,"ngSubmit","formGroup"],[2,"--padding-start","10px","margin","10px auto"],["errorText","Mobile no. is required","label","+91","placeholder","Enter your mobile number","formControlName","phone"],["slot","end","type","submit",3,"disabled"],["slot","icon-only","name","arrow-forward"]],template:function(e,r){1&e&&(o.j41(0,"ion-content")(1,"div",0),o.nrm(2,"ion-icon",1)(3,"br"),o.j41(4,"span",2),o.EFF(5),o.k0s(),o.nrm(6,"br"),o.j41(7,"span",3),o.EFF(8,"Life made easy!"),o.k0s()()(),o.j41(9,"ion-footer")(10,"ion-toolbar",4)(11,"ion-title"),o.EFF(12),o.j41(13,"form",5),o.bIt("ngSubmit",function(){return r.submitLogin()}),o.j41(14,"ion-list")(15,"ion-item",6),o.nrm(16,"ion-input",7),o.j41(17,"ion-button",8),o.nrm(18,"ion-icon",9),o.k0s()()()()()()()),2&e&&(o.R7$(5),o.JRh(r.appservice.title),o.R7$(7),o.SpI(" \xa0 Get Started with ",r.appservice.title," "),o.R7$(),o.Y8G("formGroup",r.loginForm),o.R7$(4),o.Y8G("disabled",!r.loginForm.valid))},dependencies:[a.qT,a.BC,a.cb,a.j4,a.JD,n.Jm,n.W9,n.M0,n.iq,n.$w,n.uz,n.nf,n.BC,n.ai,n.Gw]}),u})()}];let f=(()=>{var t;class u{}return(t=u).\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.$C({type:t}),t.\u0275inj=o.G2t({imports:[m.iI.forChild(h),m.iI]}),u})(),v=(()=>{var t;class u{}return(t=u).\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.$C({type:t}),t.\u0275inj=o.G2t({imports:[p.MD,a.YN,a.X1,n.bv,f]}),u})()}}]);