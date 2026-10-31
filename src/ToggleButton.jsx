import { useState } from "react";

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      style={{
        padding: "10px 20px",
        background: isOn ? "green" : "gray",
        color: "white",
      }}
    >
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
