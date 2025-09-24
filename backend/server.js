import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Server } from '@hocuspocus/server';
import { verifyFirebaseIdToken } from './firebaseAdmin.js';

const PORT = Number(process.env.PORT) || 1234;
const ALLOW_ANON = false; 

const originsRaw = process.env.CORS_ORIGINS || '*';
const corsOrigin = originsRaw === '*' ? true : originsRaw.split(',').map(s => s.trim());

const app = express();
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

app.get('/healthzzz', (_req, res) => res.json({ ok: true }));

const hocuspocus = new Server({
  port: PORT,

  async onAuthenticate(data) {
    const token =
      data.requestParameters.get('token') ||
      data.request?.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      if (!ALLOW_ANON) throw new Error('Missing auth token');
      return {
        user: {
          uid: 'anon',
          email: null,
          role: 'guest',
        },
      };
    }

    const decoded = await verifyFirebaseIdToken(token);
    console.log('[auth] ->', decoded.uid);
    // console.log('Auth ->', decoded.email);
    return {
      user: {
        uid: decoded.uid,
        email: decoded.email || null,
        role: 'user',
      },
    };
  },

  async onConnect(data) {
    console.log('[connect] ->', data.documentName);
  },

  async onDisconnect(data) {
    console.log('[disconnect] ->', data.documentName, data.context?.user?.uid);
  },
});

hocuspocus.listen();
console.log(`Hocuspocus WS on :${PORT}`);

const HTTP_PORT = PORT + 1;
app.listen(HTTP_PORT, () => {
  console.log(`Health status on :${HTTP_PORT}`);
});