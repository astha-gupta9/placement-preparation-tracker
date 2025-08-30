import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then(res => setMsg(res.data))
      .catch(() => setMsg("could not reach backend"));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24}}>
      <h1>Placement Preparation Tracker</h1>
      <p>API status: {msg}</p>
    </main>
  );
}

export default App;