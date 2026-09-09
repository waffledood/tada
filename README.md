# Tada! ✨

A playful desktop to-do app built around sticky notes, delightful interactions, and a little personality.

Tada is an experiment by **Waffle Labs** in making everyday software feel lighter, more tactile, and more fun to use.

## Idea

Tada lives on your desktop as a collection of lightweight sticky notes.

Each sticky can contain its own to-do list and behaves more like a physical note than a traditional application window — no title bars, traffic-light buttons, or unnecessary chrome.

The goal is simple:

> Make getting things done feel a little more delightful.

## Planned Features

- Multiple sticky notes on the desktop
- Frameless, draggable note windows
- Multiple to-do lists
- Quick access from the macOS menu bar
- Persistent note positions and contents
- Playful task-completion animations
- Small micro-interactions throughout the app
- Local-first storage

## Tech Stack

Tada is currently planned to use:

- **Tauri** — desktop application shell
- **React**
- **TypeScript**
- **Motion** — animations and interactions
- **SQLite** — local persistence

## Status

🚧 Early development.

The first milestone is a small macOS prototype with:

1. A sticky note window
2. Add / complete / delete tasks
3. Create multiple sticky notes
4. Persist notes between launches
5. Access Tada from the macOS menu bar

## Running Locally

Prerequisites:

- [Node.js](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/tools/install) (`cargo`/`rustc`, via rustup or Homebrew)
- macOS with Xcode Command Line Tools (`xcode-select --install`)

Then:

```bash
npm install
npm run tauri dev
```

This launches the app in development mode with hot reload. A native window should open.

## Waffle Labs

Tada is a project by **Waffle Labs** — an independent studio exploring thoughtful, quirky software.
