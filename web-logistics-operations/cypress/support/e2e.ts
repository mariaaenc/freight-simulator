
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: Cypress.env('REACT_APP_API_KEY'),
  authDomain: Cypress.env('REACT_APP_AUTH_DOMAIN'),
  projectId: Cypress.env('REACT_APP_PROJECT_ID'),
  storageBucket: Cypress.env('REACT_APP_STORAGE_BUCKET'),
  messagingSenderId: Cypress.env('REACT_APP_MESSAGING_SENDER_ID'),
  appId: Cypress.env('REACT_APP_API_ID'),
  measurementId: Cypress.env('REACT_APP_MEASUREMENT_ID'),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
