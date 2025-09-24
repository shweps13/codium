import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            type: process.env.FIREBASE_TYPE,
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
            clientId: process.env.FIREBASE_CLIENT_ID,
            authUri: process.env.FIREBASE_AUTH_URI,
            tokenUri: process.env.FIREBASE_TOKEN_URI,
            authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
            universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
          }),
    });
}

export async function verifyFirebaseIdToken(idToken) {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return decoded;
}