"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3780],{3780:(w,s,t)=>{t.r(s),t.d(s,{Network:()=>l,NetworkWeb:()=>i});var c=t(467),r=t(5083);function a(){const o=window.navigator.connection||window.navigator.mozConnection||window.navigator.webkitConnection;let n="unknown";const e=o?o.type||o.effectiveType:null;if(e&&"string"==typeof e)switch(e){case"bluetooth":case"cellular":case"slow-2g":case"2g":case"3g":n="cellular";break;case"none":n="none";break;case"ethernet":case"wifi":case"wimax":case"4g":n="wifi";break;case"other":case"unknown":n="unknown"}return n}class i extends r.E_{constructor(){super(),this.handleOnline=()=>{const e={connected:!0,connectionType:a()};this.notifyListeners("networkStatusChange",e)},this.handleOffline=()=>{this.notifyListeners("networkStatusChange",{connected:!1,connectionType:"none"})},typeof window<"u"&&(window.addEventListener("online",this.handleOnline),window.addEventListener("offline",this.handleOffline))}getStatus(){var n=this;return(0,c.A)(function*(){if(!window.navigator)throw n.unavailable("Browser does not support the Network Information API");const e=window.navigator.onLine,u=a();return{connected:e,connectionType:e?u:"none"}})()}}const l=new i}}]);