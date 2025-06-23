import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/") // Call backend
      .then((res) => setMessage(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <div>Job Portal Web Application -{message}</div>;
}

export default App;
