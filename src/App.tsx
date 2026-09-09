import { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import "./App.css";

function App() {
  const [status, setStatus] = useState("connecting...");

  useEffect(() => {
    Database.load("sqlite:tada.db")
      .then(() => setStatus("connected to SQLite"))
      .catch((err) => setStatus(`failed to connect: ${err}`));
  }, []);

  return (
    <main className="container">
      <h1>Tada</h1>
      <p>{status}</p>
    </main>
  );
}

export default App;
