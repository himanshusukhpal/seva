import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.seva.provider',
  appName: 'seva-provider',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
