import '@testing-library/jest-dom';

global.TextEncoder = require('text-encoding').TextEncoder;
global.TextDecoder = require('text-encoding').TextDecoder;

jest.mock('firebase/app', () => jest.requireActual('./authentication/mocks/firebase').firebaseApp);
jest.mock('firebase/auth', () => jest.requireActual('./authentication/mocks/firebase').firebaseAuth);