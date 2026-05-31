# Task 3 — Front-End Framework Basics (React)

**Folder:** `Task-3-Front-End-Framework-Basics/`  
**Path on WAMP:** `C:\wamp64\www\Summer Internship\Task-3-Front-End-Framework-Basics`

## Description
"Task Flow" — a full-featured to-do list app built with **React** and **Bootstrap 5.3.8**. Users can add, edit, delete, duplicate, and filter tasks with priority levels and due dates. Data persists in `localStorage`.

## Features
- **Add tasks** — Title, description, priority (Low / Medium / High), and due date
- **Edit tasks** — Inline editing of all fields (Enter to save, Escape to cancel)
- **Delete tasks** — With confirmation dialog
- **Duplicate tasks** — Quick copy with "(copy)" suffix
- **Toggle complete** — Checkbox with strikethrough styling
- **Filter** — All / Active / Completed with live count badges
- **Sort** — By newest, oldest, or priority
- **Progress bar** — Visual completion percentage
- **localStorage** — Persists data across sessions
- **Bootstrap 5.3.8** — Modern card UI, input groups, badges, progress bar, buttons
- **Creative background** — Dark gradient animated theme

## Live Demo
🌐 [View Live on GitHub Pages](https://suyog-shirsat2004.github.io/SaiKet-FullStack-Internship/Task-3-Front-End-Framework-Basics/dist/)
🌐 [View on jsDelivr CDN](https://cdn.jsdelivr.net/gh/suyog-shirsat2004/SaiKet-FullStack-Internship@main/Task-3-Front-End-Framework-Basics/dist/index.html)

## How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) v18+

### Dev Server (Hot Reload)
```bash
cd Task-3-Front-End-Framework-Basics
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```
Then serve the `dist/` folder with any static server.

### WAMP
Build first (`npm run build`), then visit:
```
http://localhost/Summer%20Internship/Task-3-Front-End-Framework-Basics/dist/
```
