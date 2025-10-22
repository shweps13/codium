# Codium - Collaborative Code Editor

## Inspiration
- Idea came from: [React Project Ideas](https://medium.com/@rohan.fulzele/50-beginner-and-intermediate-level-react-project-ideas-%EF%B8%8F-809b396faa39)  
  (41. Collaborative Code Editor: Develop an online code editor that multiple users can collaborate on in real time.)

## Styling Reference
- Styles for code window: [Figma community design](https://www.figma.com/community/file/1232205958285599960)
- Styles for the main screen: [Visily.ai](https://app.visily.ai/projects/816a6f68-b8fc-4c32-b313-94b6d1120f49/boards/2279133)
- Pure CSS loader: [loading.io](https://loading.io/css/)
---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Styling: CSS, CSS Modules, or Styled-Components

**Editor**
- CodeMirror or Monaco Editor

**Backend**
- WebSockets (Socket.IO / ws)  
- Or CRDT-based: Y.js / Automerge with WebRTC or WebSocket provider

**Authentication + Storage**
- Firebase Auth
- Firebase Database or Firestore

**Deployment**
- Frontend: Firebase Hosting  
- Backend: Render.com

---

## Core Features (MVP)
- Real-time collaborative editing (code window)
- Multiple users see live changes instantly
- Show cursors and presence of other users
- Basic authentication (username/session)
- Single-file editing to start (expandable later)

---

## Extra Features
- Multiple language support (JS, TS, Python, etc.)
- Themes (light/dark)
- File structure & tabs
- Version history
- Inline comments or chat panel

---