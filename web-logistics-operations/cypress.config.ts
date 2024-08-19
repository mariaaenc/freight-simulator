import { defineConfig } from 'cypress';
import admin from 'firebase-admin'
import { plugin } from 'cypress-firebase';
import * as serviceAccount from './serviceAccount.json'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      const extendedConfig = plugin(on, config, admin, {
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      })
      return extendedConfig
    }
  }
});
