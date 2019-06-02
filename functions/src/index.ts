
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import demoApp from './demo';

admin.initializeApp();

export const demo = functions.https.onRequest(demoApp);
