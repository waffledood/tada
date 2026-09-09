# TODO

Deferred items from early scaffolding, to revisit in future iterations.

## Window chrome

- Switch to frameless windows (`decorations: false` in `tauri.conf.json`) to match the "no title bar, no traffic lights" sticky-note look from the README.
- Add a `data-tauri-drag-region` element (e.g. a note header) once frameless — dragging isn't automatic without decorations.
- Design a custom close affordance (no OS close button once frameless).

## Menu bar

- Add a Tauri tray icon (`tauri::tray::TrayIconBuilder`) for quick access to Tada from the macOS menu bar.
