export const verifyIdTokenMock = jest.fn();

export const firebaseAdmin = {
  auth: () => ({
    verifyIdToken: verifyIdTokenMock,
  }),
};
