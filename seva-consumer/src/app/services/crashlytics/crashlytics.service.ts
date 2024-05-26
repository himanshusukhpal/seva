import { Injectable } from '@angular/core';

import { FirebaseCrashlytics, RecordExceptionOptions } from '@capacitor-firebase/crashlytics';

import * as StackTrace from 'stacktrace-js';

@Injectable({
  providedIn: 'root'
})
export class CrashlyticsService {

  isWeb = false;

  constructor() { }

  async crash(message: string) {
    if(!this.isWeb) {
        try {
        await FirebaseCrashlytics.crash({ message });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async setUserId(userId: string) {
    if(!this.isWeb) {
      try {
        await FirebaseCrashlytics.setUserId({ userId });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async addLogMessage(message: string) {
    if(!this.isWeb) {
      try {
        await FirebaseCrashlytics.log({ message });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async setEnabled(enabled = true) {
    if(!this.isWeb) {
      try {
        await FirebaseCrashlytics.setEnabled({ enabled });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async isEnabled() {
    if(!this.isWeb) {
      try {
        return (await FirebaseCrashlytics.isEnabled()).enabled;
      } catch (e) {
        console.log(e);
      }
    }
    return;
  }

  async didCrashDuringPreviousExecution() {
    if(!this.isWeb) {
      try {
        return (await FirebaseCrashlytics.didCrashOnPreviousExecution()).crashed;
      } catch (e) {
        console.log(e);
      }
    }
    return;
  }

  async sendUnsentReports() {
    if(!this.isWeb) {
      try {
        await FirebaseCrashlytics.sendUnsentReports();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async deleteUnsentReports() {
    if(!this.isWeb) {
      try {
        await FirebaseCrashlytics.deleteUnsentReports();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async recordException(error: any, stackTrace = true) {
    if(!this.isWeb) {
      const exceptionOptions: RecordExceptionOptions = {
        message: 'Exception encountered'
      };
      try {
        try {
          if(typeof error === 'object' || typeof error === 'symbol') {
            if(error['message']) exceptionOptions.message = error.message;
            if(error['error']) {
              if(
                (
                  typeof error.error === 'object' ||
                  typeof error.error === 'symbol'
                ) &&
                error.error['message']
              ) exceptionOptions.message = error.error.message;
            }
          }
          else exceptionOptions.message = error;
        } catch (e) {
          console.log(e)
        }
        if(stackTrace && error.stack) {
          const errorStacktrace = await StackTrace.fromError(error);
          exceptionOptions.stacktrace = errorStacktrace;
        }
      } catch (e) {
        console.log(e);
      } finally {
        await FirebaseCrashlytics.recordException(exceptionOptions);
      }
    }
  };

}
