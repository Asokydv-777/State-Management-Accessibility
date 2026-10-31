React Fundamentals

### State Management · Accessibility Kata · Component Library

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Accessibility](https://img.shields.io/badge/A11y-Keyboard_Tested-4CAF50?style=for-the-badge&logo=accessibility&logoColor=white)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge)

*A focused exercise in knowing **when** to use Context, **why** accessibility must come first, and **how** to build a real, keyboard-friendly Button.*

</div>

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Getting Started](#-getting-started)
5. [Deliverables](#-deliverables)
   - [1. Context Example](#1--context-example)
   - [2. Context Explanation](#2--context-explanation)
   - [3. Keyboard Accessibility Audit](#3--keyboard-accessibility-audit)
   - [4. Button Component](#4--button-component)
6. [Key Concepts Cheat Sheet](#-key-concepts-cheat-sheet)
7. [How This Gets Reviewed](#-how-this-gets-reviewed)
8. [Common Pitfalls Avoided](#-common-pitfalls-avoided)
9. [Reflection](#-reflection)

---

## 🎯 Overview

This assignment has three goals:

| Goal | Why it matters |
|---|---|
| **Use Context correctly** | Context is powerful but easy to misuse as a global store. This builds the judgment to know **when** it fits. |
| **Test accessibility with a keyboard BEFORE shipping** | Accessibility must be baked in from line one — not bolted on later, which is always more expensive. |
| **Start a component library with a real `<button>`** | A semantic `<button>` gives focus, keyboard activation, and screen-reader role **for free**. |

---

## 🧰 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| **React** | 18 | UI library |
| **Vite** | 5 | Build tool & dev server |
| **CSS** | — | Styling (no framework, kept minimal) |
| **React Context API** | built-in | Cross-tree state sharing |

---

## 📂 Project Structure

```
react-phase8/
├── public/
├── src/
│   ├── components/
│   │   ├── Button.jsx           # 🎁 Deliverable: real <button> component
│   │   └── Button.css
│   ├── context/
│   │   └── ThemeContext.jsx     # 🎁 Deliverable: Context provider + hook
│   ├── DeepComponent.jsx        # 🎁 Deliverable: consumer at depth 3
│   ├── ToggleButton.jsx         # Component used for the keyboard audit
│   ├── App.jsx                  # 🎁 Wires everything together
│   ├── App.css
│   └── main.jsx
├── AUDIT_NOTES.md               # 🎁 Deliverable: keyboard-only audit
├── package.json
└── README.md
```

> 💡 **Tip:** Files marked with 🎁 are the exact deliverables required by the assignment.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or v20+
- **npm** (comes with Node)
- A code editor (VS Code recommended)

Check your versions:

```bash
node --version   # should print v18.x or v20.x
npm --version
```

### Install & run

```bash
# 1. Clone / unzip the project, then:
cd react-phase8

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the printed URL (usually **http://localhost:5173**) in your browser.

### Build for production (optional)

```bash
npm run build
npm run preview
```

---

## 📦 Deliverables

### 1 · Context Example

**Location:** `src/context/ThemeContext.jsx`, `src/DeepComponent.jsx`, `src/App.jsx`

A **light/dark theme** shared through Context, consumed at **two different nesting depths**:

| Consumer | Depth | Path |
|---|---|---|
| `Toolbar` | **1** | `App → Toolbar` |
| `DeepComponent` | **3** | `App → MiddleLayer → DeepComponent` |

`MiddleLayer` deliberately **does not** touch the context — proving that the value is **not** being prop-drilled.

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

**Reviewer check:** change the theme → both `Toolbar` and `DeepComponent` update together.

---

### 2 · Context Explanation

> **When is Context the right tool?**
> Context is the right tool when **many components at different nesting levels** need to read the **same infrequently-changing data** — like a theme, a logged-in user, or a locale. It eliminates prop drilling through intermediate components that do not care about the value.
>
> **When would you reach for something else?**
> Use `useState` (local state) when **only one component** needs the data. Use a **dedicated store** like Zustand or Redux when the data changes **frequently** and requires **complex update logic** — with Context, every consumer would re-render on every change.

---

### 3 · Keyboard Accessibility Audit

**Location:** `AUDIT_NOTES.md`

Component tested with **Tab · Shift+Tab · Enter · Space only** (no mouse).

| Check | Result | Notes |
|---|---|---|
| Reach every interactive element with `Tab` alone? | ✅ Yes | Focus moved through `Toolbar`, `ToggleButton`, and `Button` in logical order. |
| Visible focus indicator? | ✅ Yes | `:focus-visible` outline is 3px solid orange — high contrast, clearly visible. |
| Activate buttons with `Enter` / `Space`? | ✅ Yes | Native `<button>` behavior — no extra code required. |
| Any failures? | — | None at this stage. |

**Observations recorded during the audit:**

- A real `<button>` is **focusable and activatable by default** — a `<div onClick>` would not be, and would require `tabIndex="0"` **and** an `onKeyDown` handler that duplicates browser behavior.
- `disabled` on a real `<button>` correctly **removes it from the tab order** and blocks clicks — a CSS-only “greyed out” look would still be clickable.
- The `:focus-visible` outline is essential — without it, keyboard users cannot tell where they are.

---

### 4 · Button Component

**Location:** `src/components/Button.jsx`

A real `<button>` — never a `<div>` — with:

- ✅ **Two visual variants** → `primary` / `secondary`
- ✅ **A genuinely disabled state** → `disabled` attribute set (not just styled)
- ✅ **Visible keyboard focus** → `:focus-visible` CSS outline
- ✅ **Spread props** → pass `onClick`, `type`, `aria-*`, etc. freely

```jsx
// src/components/Button.jsx
export default function Button({
  variant = 'primary',
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Reviewer check:** press `Tab` to reach the button, then `Enter` or `Space` to activate — it must work **with no extra code**.

---

## 📚 Key Concepts Cheat Sheet

### When to use what?

| Situation | Right tool |
|---|---|
| Data only **one** component needs | `useState` (local state) |
| Data a **few siblings** need | Lift state to their nearest common parent |
| Data **many** components need, changes **infrequently** | **Context** ✅ |
| Data **many** components need, changes **frequently** with complex logic | A dedicated store (Zustand / Redux) |

### ARIA vs. Semantic HTML

> **First rule of ARIA:** *No ARIA is better than wrong ARIA.*

| Use **semantic HTML** | Use **ARIA** |
|---|---|
| Whenever a native element exists (`<button>`, `<input>`, `<nav>`, `<dialog>`) | Only when building a **custom widget** with no native equivalent |
| Gives focus, keyboard behavior, and role **for free** | Must be added carefully — easy to break for screen readers |

### ARIA attributes used / referenced

| Attribute | Purpose |
|---|---|
| `role` | Tells assistive tech what **kind** of element it is |
| `aria-label` | Accessible name when no visible text exists |
| `aria-describedby` | Points to another element's `id` for extra description |
| `aria-expanded` | Signals whether a collapsible element is open or closed |

---

## 🔍 How This Gets Reviewed

| Reviewer action | What it proves |
|---|---|
| Changes the Context value and confirms both consumers update | `useContext` wiring is correct |
| Runs the same keyboard audit independently | The submitted audit notes match reality |
| Presses `Tab` to the Button and activates with `Enter` / `Space` | It is a **real `<button>`**, not a styled `<div>` |
| Confirms the disabled Button is unclickable and skipped by `Tab` | `disabled` attribute is set, not just a CSS class |

---

## ⚠️ Common Pitfalls Avoided

| ❌ Pitfall | ✅ How this project avoids it |
|---|---|
| Using Context for data only 1–2 components need | Context is only used for theme, which is needed at **multiple depths** |
| Styling an element to look disabled but leaving it clickable | `disabled` attribute is set on the real `<button>` |
| Assuming accessibility without testing | Keyboard-only audit was performed and documented |
| Building Button as `<div onClick>` | `Button` uses a native `<button>` — no manual keyboard handling needed |

---

## 🧠 Reflection

This exercise shifted my mental model in two ways:

1. **Context is a scalpel, not a hammer.** Before, I would have reached for Context for anything shared. Now I know it fits **infrequent, wide-reaching** data — and that a local `useState` or lifted state is often the *simpler* answer for a small tree.

2. **Accessibility is a habit, not a checklist.** Running the keyboard audit *before* building the library meant every subsequent component inherited the right defaults. Using a real `<button>` gave me keyboard focus, `Enter`/`Space` activation, and screen-reader semantics **for free** — the only thing I had to add was a visible `:focus-visible` outline.
