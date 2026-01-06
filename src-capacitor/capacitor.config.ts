import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.filipjakovljevic.thoughtless',
  appName: 'Thoughtless',
  webDir: 'www',

  server: {
    url: 'http://localhost:9001',
    cleartext: true,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
}

export default config
