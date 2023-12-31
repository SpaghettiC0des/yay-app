import * as admin from 'firebase-admin';

// import {storageBucket} from 'firebase-functions/params';

import serviceAccount from './service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  // storageBucket: process.env.JEST_WORKER_ID ? 'test' : storageBucket.value(),
  storageBucket: 'yay-app-2023.appspot.com',
});

export * from './youtubedl';
