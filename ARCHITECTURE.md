# Architecture

## Tech stack

- **Tauri 2** — desktop app shell. Wraps a native window around a webview, with a Rust backend that has OS-level access (filesystem, SQLite, etc). Lighter than Electron: uses the OS's built-in webview instead of bundling Chromium.
- **React 19 + TypeScript** — frontend UI, running inside the webview.
- **Vite** — frontend dev server and bundler.
- **Rust** — backend language. Compiled, statically-typed.
- **SQLite**, via `tauri-plugin-sql` — local persistence. The plugin owns the actual DB connection/queries; the frontend talks to it through Tauri's JS bridge rather than a raw driver.

## How the pieces fit together

A Tauri app is two separate programs running together as one app: a **frontend** (web tech, sandboxed in a webview) and a **backend** (native Rust, has OS access). The frontend can't touch the OS directly — it has to ask the backend to do it.

```
┌──────────────────────────────┐
│   Native window (Rust)       │
│  ┌─────────────────────────┐ │
│  │  Webview                │ │
│  │  (React app, src/)      │ │
│  └─────────────────────────┘ │
│   src-tauri/ — owns the      │
│   window, talks to SQLite,   │
│   OS-level stuff             │
└──────────────────────────────┘
```

Frontend → backend communication happens via `invoke()` (from `@tauri-apps/api`), a lightweight RPC call into Rust functions marked `#[tauri::command]`. For SQLite, `tauri-plugin-sql` provides this bridge for us — `Database.load("sqlite:tada.db")` in the frontend reaches into the Rust `sql` plugin, which opens the actual `.db` file (stored in the OS app-data folder, not in this repo) and executes queries natively.

Tauri is permission-gated by default: the frontend can only call backend capabilities that are explicitly allowlisted in `src-tauri/capabilities/default.json` (e.g. `sql:allow-execute`). This is stricter than Electron's default renderer access.

## Repo layout

### Frontend — `src/`

Ordinary React + TypeScript app, no Tauri-specific shape.

- `src/main.tsx` — entry point, mounts `<App />`
- `src/App.tsx` — UI
- `index.html`, `vite.config.ts`, `tsconfig*.json` — standard Vite/React/TS config

### Backend — `src-tauri/`

- `src-tauri/src/main.rs` — entry point, calls `tada_lib::run()`
- `src-tauri/src/lib.rs` — app setup: creates the window, registers plugins (`opener`, `sql`)
- `src-tauri/Cargo.toml` / `Cargo.lock` — Rust dependency manifest/lockfile (equivalent to `package.json`/`package-lock.json`)
- `src-tauri/tauri.conf.json` — app config: window size/title, app identifier, bundling targets for distribution
- `src-tauri/capabilities/default.json` — permission allowlist for what the frontend can call into
- `src-tauri/icons/` — app icons for bundling
- `src-tauri/gen/schemas/` — auto-generated, not hand-edited

## Where things will grow

- More UI → `src/`, ordinary React work
- Custom Rust logic → new `#[tauri::command]` functions in `lib.rs`, called from the frontend via `invoke()`
- New OS capabilities (tray icon, frameless windows — see `TODO.md`) → `lib.rs` + `tauri.conf.json`, possibly new entries in `capabilities/default.json`

## Packaging

`npm run tauri build` compiles a release binary and bundles it per `tauri.conf.json`'s `bundle` config (currently `"targets": "all"`) — on macOS, a `.app` and `.dmg`. Distributing outside your own dev machine will eventually need code signing + notarization (Apple Developer account) to avoid Gatekeeper warnings — not needed for local dev.
