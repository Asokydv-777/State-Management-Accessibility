import { useTheme } from "./ThemeContext";

export default function DeepComponent() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        border: "1px solid gray",
        background: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <h3>I am a deeply nested component</h3>
      <p>Current theme: {theme}</p>
    </div>
  );
}
