import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.seva.consumer',
  appName: 'seva-consumer',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
