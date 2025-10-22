# Backend - Codium Collaborative Code Editor

This is the backend server for the Codium collaborative code editor, providing real-time WebSocket collaboration and Firebase authentication.

## Tech Stack

- **Node.js** with ES modules
- **Express.js** - HTTP server for health checks and API endpoints
- **@hocuspocus/server** - WebSocket server for real-time collaboration
- **Firebase Admin SDK** - Server-side authentication and database operations
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Dependencies

- `@hocuspocus/server` - WebSocket server for real-time collaboration
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `express` - HTTP server framework
- `firebase-admin` - Firebase Admin SDK

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- NPM
- Firebase project with Authentication and Firestore enabled
- Firebase service account key

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
Create a `.env` file in the backend directory with your Firebase service account credentials

3. **Configure CORS origins (optional):**
```env
CORS_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
PORT=1234
```

4. **Enable anonymous access (optional):**
To allow users to collaborate without Firebase authentication, you can set:
```env
ALLOW_ANON=true
```
**Note:** This bypasses authentication and should only be used for development or testing purposes.

5. **Start the server:**
```bash
npm start
```

## Server Architecture

The backend runs two servers simultaneously:

### WebSocket Server (Port 1234)
- **@hocuspocus/server** for real-time collaboration
- Handles document synchronization
- Manages user presence and cursors
- Authenticates users via Firebase tokens (Via service account for firebase-admin)

### HTTP Server (Port 1235)
- **Express.js** for health checks and API endpoints
- Health check endpoint: `GET /healthzzz`

## Authentication Flow

1. Client sends Firebase ID token in WebSocket connection
2. Server verifies token using Firebase Admin SDK
3. User is authenticated and can collaborate on documents

### Anonymous Access
- Set `ALLOW_ANON=true` in environment variables to bypass authentication
- Users can connect without Firebase tokens

## Available Scripts
- `npm start` - Start both WebSocket and HTTP servers

## API Endpoints

### Health Check
- **GET** `/healthzzz` - Returns server health status
- **Response:** `{ "ok": true }`

## WebSocket Connection

The WebSocket server accepts connections with Firebase authentication:

```javascript
const ws = new WebSocket('ws://localhost:1234', {
  headers: {
    'Authorization': `Bearer ${firebaseToken}`
  }
});
```

## Project Structure

```
backend/
├── firebaseAdmin.js    # Firebase Admin configuration
├── server.js           # Express + Hocuspocus server
├── package.json        # Dependencies and scripts
└── .env               # Environment variables (not in repo)
```
