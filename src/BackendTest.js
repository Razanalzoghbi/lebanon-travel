import { useEffect, useState } from "react";

function BackendTest() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error("Backend connection failed:", error);
        setMessage("Could not connect to backend.");
      });
  }, []);

  return (
    <div>
      <h3>Backend Connection Test</h3>
      <p>{message}</p>
    </div>
  );
}

export default BackendTest;
