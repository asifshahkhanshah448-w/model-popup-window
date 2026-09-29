# Internship Project 3: Modal / Popup Window

A production-grade, lightweight, and accessible Modal / Popup window application crafted using semantic **HTML5**, modern **CSS3**, and vanilla **JavaScript**. Built specifically for frontend development internship evaluation and portfolio submission.

---

## 📌 Project Overview

This project implements a robust, reusable dialog window featuring smooth 60fps entrance/exit animations, accessible keyboard interactions (Focus Trapping, Escape key dismissal), outside-click backdrop detection, and client-side form validation with real-time feedback and an in-modal success state.

---

## ✨ Features

- **Smooth CSS Animations**: Hardware-accelerated scale-in and fade-out transitions using custom cubic-bezier timing curves.
- **Multiple Dismissal Methods**:
  - Top-right close (`X`) icon button.
  - Secondary `Cancel` button.
  - Physical keyboard <kbd>Esc</kbd> key detection.
  - Frosted semi-transparent dark backdrop click (with drag-release protection).
- **Keyboard & Accessibility (A11y)**:
  - WAI-ARIA compliant (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`).
  - Active Tab-key focus trapping prevents tabbing outside the open modal.
  - Focus restoration returning to the trigger element when closed.
  - Fully accessible labels and ARIA live regions for validation.
  - `prefers-reduced-motion` compliance for users with motion sensitivity.
- **Interactive Form & Validation**:
  - Fields for Full Name, Email, Inquiry Topic, and Message.
  - Clean client-side regex and length validation.
  - Inline error feedback with real-time clearing upon user typing.
  - Seamless in-modal success confirmation card without page reloads.
- **Fully Responsive**:
  - Fluid layout tested from small mobile viewports (320px, 375px, 390px, 414px) up to 4K ultra-wide screens (1440px+).
  - Internal modal scrolling on compact mobile viewports (`max-height: calc(100vh - 2.5rem)`).
  - Prevents background document scroll jitter with custom scrollbar compensation.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic elements (`<header>`, `<main>`, `<section>`, `<dialog>` semantics, `<form>`, `<button>`).
- **CSS3**: Custom design tokens, CSS Flexbox & Grid, CSS transitions, keyframes, backdrop filters.
- **JavaScript (ES6+)**: Event listeners, DOM manipulation, regular expressions, focus management.

*Zero external runtime dependencies or heavy JavaScript frameworks required.*

---

## 📂 Folder Structure

```
modal-popup-project/
│
├── index.html        # Main HTML5 document & modal markup
├── style.css         # Complete responsive styles & animations
├── script.js         # Modal engine, accessibility & form validation
└── README.md         # Documentation & deployment instructions
```

---

## 🚀 How to Run in VS Code

### Method 1: VS Code Live Server (Recommended)
1. Open **VS Code**.
2. Click **File > Open Folder...** and select the `modal-popup-project` directory.
3. Install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl+Shift+X` or `Cmd+Shift+X`).
4. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500/index.html` with hot-reloading enabled.

### Method 2: Direct Browser Launch
1. Open your computer's file explorer.
2. Double-click `index.html` to open it in Chrome, Safari, Edge, or Firefox.

---

## 🌐 Live Deployment Guide

This project consists of pure static files and can be deployed in under 2 minutes:

### 1. GitHub Pages
1. Push your project files (`index.html`, `style.css`, `script.js`, `README.md`) to a GitHub repository.
2. Go to your repository's **Settings > Pages**.
3. Under **Source**, select `Deploy from a branch` and choose `main` (or `master`) branch `/root`.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Netlify
1. Go to [Netlify.com](https://www.netlify.com/) and log in.
2. Drag and drop the `modal-popup-project` folder directly into the Netlify dashboard.
3. Instant deployment will generate your live production URL.

### 3. Vercel
1. Install Vercel CLI (`npm i -g vercel`) or import your GitHub repository on [Vercel.com](https://vercel.com).
2. Set Framework Preset to **Other** (Static HTML).
3. Click **Deploy**.

---

## 🔍 Modal Functionality Checklist

- [x] **Open Trigger**: Clearly visible, styled primary button opens the modal.
- [x] **Overlay Background**: Dark, semi-transparent blur overlay behind the active dialog.
- [x] **Close Buttons**: Interactive top-right close `X` and bottom `Cancel` buttons.
- [x] **Overlay Click**: Clicking the backdrop outside the modal dialog smoothly dismisses it.
- [x] **Escape Key**: Pressing <kbd>Esc</kbd> closes the modal dialog instantly.
- [x] **CSS Animations**: Subtle scale and opacity transitions for modal entry and exit.
- [x] **Form Processing**: Real-time validation, error styling, and no page reload on submit.
- [x] **Success View**: Clean confirmation with submitted summary details.
- [x] **Responsiveness**: Guaranteed cross-device compatibility from 320px mobile to 1440px+ desktop.
- [x] **Zero Console Errors**: Clean execution with well-structured event listeners.

---

## 📄 License & Attribution

Developed for **Internship Project 3: Modal / Popup Window**. Open-source under the MIT License.
