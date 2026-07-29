# Sura.ai — AI Chat Interface

A responsive, dark/light-mode AI chat interface UI with a collapsible sidebar, floating pill navbar, glowing chat input, voice input, file upload, and local chat history — built with plain HTML, CSS, and JavaScript (no frameworks).

## 📁 File Structure

```
AI chat interface 2/
├── index.html      # Markup / structure of the app
├── style.css       # All styling (layout, theme, animations, responsive rules)
└── script.js        # All functionality (sidebar, navbar, theme, chat logic)
```

## ✨ Features

- **Collapsible Sidebar** — toggled via a hamburger icon that stays visible on every screen size. Opening it pushes the navbar and chat area to the right.
- **Floating Pill Navbar** — logo, nav links (Home, AI Tools, Models, Workspace), search icon, theme toggle, and profile button.
- **Glowing Chat Input** — a chat bar with a mouse-tracked radial glow effect, auto-resizing textarea, mode dropdown (Normal / Deep Thinking), voice input, and file upload.
- **Light / Dark Mode** — toggle from the navbar icon or sidebar button; preference is saved in `localStorage`.
- **Chat History** — messages are saved to `localStorage` and listed in the sidebar; clicking a history item loads it back into the input. Includes a "Clear History" option.
- **Typing Indicator & Placeholder AI Response** — simulated "thinking" animation after sending a message.
- **Fully Responsive** — layout adapts for tablet and mobile screens.

## 🛠️ Tech Used

- HTML5
- CSS3 (CSS variables for theming, flexbox, keyframe animations)
- Vanilla JavaScript (DOM APIs, `localStorage`, Web Speech API for voice input)

## 🚀 Getting Started

1. Download / clone the `AI chat interface 2` folder.
2. Make sure all three files (`index.html`, `style.css`, `script.js`) are in the **same folder**.
3. Open `index.html` in any modern browser (Chrome recommended for voice input support).

No build tools, servers, or dependencies required — it runs directly in the browser.

## 🎨 Customization

| What to change        | Where |
|------------------------|-------|
| Brand name / logo      | `index.html` → `.nav-logo` and `.sidebar h1` |
| Colors / theme         | `style.css` → `:root` and `body.light-theme` CSS variables |
| Sidebar width           | `style.css` → `--sidebar-w` variable |
| Nav links               | `index.html` → `.nav-links` |
| Chat glow colors        | `style.css` → `.chat-wrapper::before` gradient |

## 🌗 Theme System

Theming is handled entirely through CSS variables defined in `:root` (dark, default) and overridden inside `body.light-theme` (light mode). Toggling the theme button in `script.js` simply adds/removes the `light-theme` class on `<body>` and saves the choice to `localStorage`.

## ⚠️ Notes

- Voice input uses the `webkitSpeechRecognition` API, which currently works best in Chromium-based browsers.
- Chat history is stored **locally in the browser** (`localStorage`) — it is not synced to any server or account.
- This is a **frontend UI only**; the "AI response" is a placeholder (`alert`) and needs to be connected to a real backend/AI API for actual functionality.

## 📄 License

Free to use and modify for personal or commercial projects.