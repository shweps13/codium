# Codium - Collaborative Code Editor

<img width="4404" height="4228" alt="image" src="https://github.com/user-attachments/assets/db09ccb6-8133-4a0c-b5d0-72ccf016b3ed" />


A real-time collaborative code editor built with React and Firebase, allowing multiple users to edit code together with live synchronization and user presence indicators.

## Deployed Demo
- Frontend ->   [https://codium-c1bd3.web.app/](https://codium-c1bd3.web.app/) - [Firebase Hosting]
- Backend ->   wss://codium-86dg.onrender.com - [Render.com]

## Tech Stack

**Frontend**
- React (Vite) + React Router
- Styling: CSS Modules + Motion (Animation library)

**Editor**
- @uiw/react-codemirror with CodeMirror 6
- y-codemirror.next for real-time collaboration

**Backend**
- Node.js with Express
- @hocuspocus/server for WebSocket collaboration
- Firebase Admin SDK
- CORS for cross-origin requests

**Authentication + Storage**
- Firebase Auth
- Firestore Database

---

## Inspiration
- Idea came from: [React Project Ideas](https://medium.com/@rohan.fulzele/50-beginner-and-intermediate-level-react-project-ideas-%EF%B8%8F-809b396faa39)  
  (41. Collaborative Code Editor: Develop an online code editor that multiple users can collaborate on in real time.)

## Styling Reference
- Styles for code window: [Figma community design](https://www.figma.com/community/file/1232205958285599960)
- Styles for the main screen: [Visily.ai](https://app.visily.ai/projects/816a6f68-b8fc-4c32-b313-94b6d1120f49/boards/2279133)
- Pure CSS loader: [loading.io](https://loading.io/css/)

---


## Quick Start

For detailed installation and setup instructions, see:
- [Frontend Setup Guide](./frontend/README.md)
- [Backend Setup Guide](./backend/README.md)

---

## Architecture Overview

### Firebase Services
- **Firebase Authentication**: User login/signup
- **Firestore Database**: File storage and collaboration data
- **Firebase Hosting**: Frontend deployment (optional for development)

### Backend Services
- **WebSocket Server**: @hocuspocus/server for real-time collaboration (port 1234)
- **Authentication**: Firebase Admin SDK for token verification
- **CORS**: Configured for cross-origin requests

### Real-time Collaboration
- Uses **y-codemirror.next** for collaborative editing
- **@hocuspocus/server** manages WebSocket connections and document synchronization
- Firebase tokens authenticate users for secure collaboration

---

## Core Features (MVP)
- Real-time collaborative editing (code window)
- Multiple users see live changes instantly
- Show cursors and presence of other users
- User authentication (email/password + google/github)
- File management (create, read, update, delete)
- Smooth animations and transitions for enhanced UX

---

## Extra Features (TODO)
- Multiple language support (JS, TS, Python, etc.)
- Themes (light/dark)
- File structure & tabs
- Version history
- Inline comments or chat panel

---

## Project Structure

```
codium/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── README.md      # Frontend setup guide
├── backend/           # Node.js backend server
│   ├── server.js      # Express + Hocuspocus server
│   ├── firebaseAdmin.js # Firebase Admin configuration
│   └── README.md      # Backend setup guide
└── README.md          # Main project documentation
```

For detailed project structure, see the individual README files in each directory.
