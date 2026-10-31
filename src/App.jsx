import { ThemeProvider, useTheme } from "./ThemeContext";
import DeepComponent from "./DeepComponent";

// This is a middle-layer component that does NOT use the theme
function MiddleLayer() {
  return (
    <div style={{ padding: "20px", border: "1px dashed blue" }}>
      <p>I am a middle-layer component. I do not use Context at all.</p>
      <DeepComponent />
    </div>
  );
}

function Toolbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>Toggle theme (currently {theme})</button>
  );
}

function AppContent() {
  return (
    <div>
      <h1>My Context Example</h1>
      <Toolbar />
      <MiddleLayer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}