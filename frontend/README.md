# Frontend - Codium Collaborative Code Editor

This is the frontend React application for the Codium collaborative code editor.
During local testing is recommended to use local instance of the server, cause deployed version takes some time on start if not used for a while.

## Tech Stack

- **React** (Vite)
- **React Router** - Client-side routing
- **@uiw/react-codemirror** - Code editor component
- **y-codemirror.next** - Real-time collaborative editing
- **Firebase** - Authentication and database
- **CSS Modules** - Styling

## Dependencies

### Core Dependencies
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `@uiw/react-codemirror` - Code editor component
- `y-codemirror.next` - Real-time collaborative editing
- `firebase` - Authentication and database

### UI Dependencies
- `@radix-ui/react-dialog` - Modal components
- `@radix-ui/react-toast` - Toast notifications
- `motion` - Animation library for smooth transitions and effects

### Development Dependencies
- `vite` - Build tool and dev server
- `eslint` - Code linting

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- NPM
- Firebase project with Authentication and Firestore enabled

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
cp .env.local.example .env.local
```

3. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password provider)
   - Enable Firestore Database
   - Copy your Firebase config to `.env.local`

4. **Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

5. **(Optional) Run local backend:**
It will be faster to use it for testing, but you still able to use remote one
```env
VITE_WS_URL=ws://localhost:1234
```
```env
VITE_WS_URL=wss://codium-86dg.onrender.com
```


## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── AnimatedBackground.jsx
│   ├── Editor.jsx
│   ├── FileCard.jsx
│   ├── JoinRoomModal.jsx
│   └── Pagination.jsx
├── contexts/       # React contexts
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   ├── ToastContext.js
│   └── ToastProvider.jsx
├── features/       # Feature-specific components
│   ├── SignInModal.jsx
│   └── SignUpModal.jsx
├── hooks/          # Custom React hooks
│   ├── useAuth.js
│   └── useToast.js
├── pages/          # Page components
│   ├── 404.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   └── MainEditor.jsx
├── services/       # API and external services
│   └── fileService.js
├── shared/         # Shared components
│   ├── Header.jsx
│   ├── ProtectedRoute.jsx
│   └── Snippet.jsx
├── utils/          # Utility functions
│   ├── editorRuntime.js
│   └── firebase.js
├── css/            # CSS Modules
├── assets/         # Static assets
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Features

- **Real-time collaborative editing** with live synchronization
- **User authentication** via Firebase Auth
- **File management** (create, read, update, delete)
- **Responsive design** with modern UI
- **Smooth animations** using Motion library for enhanced UX
- **Toast notifications** for user feedback
