import { useEffect, useState } from "react";
import { getMessage } from "./api";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getMessage().then((data) => setMsg(data.message));
  }, []);

  return <h1>{msg}</h1>;
}

export default App;
