const initializeApp = jest.fn();
const getApps = jest.fn(() => []);
const getAuth = jest.fn(() => ({
  currentUser: null,
}));

const FirebaseApp = jest.fn(() => ({}));
const GoogleAuthProvider = jest.fn(() => ({}));

const signInWithPopup = jest.fn(() => Promise.resolve({
  user: { uid: 'test-uid', email: 'test@example.com' },
}));

const signOut = jest.fn(() => Promise.resolve());
const onAuthStateChanged = () => jest.fn()
export const firebaseApp = { initializeApp, getApps, FirebaseApp }
export const firebaseAuth = { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }