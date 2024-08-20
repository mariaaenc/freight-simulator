jest.mock(
  'firebase-admin',
  () =>
    jest.requireActual('./common/middlewares/mocks/firebase-admin.ts')
      .firebaseAdmin,
);
