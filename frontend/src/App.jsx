import { useState, useEffect } from 'react'
import './App.css'

import { auth } from "./utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div>{user ? (
        <>
          <h1>Welcome {user.email}</h1>
          <button onClick={() => signOut(auth)}>Logout</button>
        </>
      ) : (
        <h1>Please log in</h1>
      )}</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
