# Tenzies — React + Vite

Simple implementation of the classic "Tenzies" dice game built with React and Vite.

## Overview

- Playable single-page game where you roll 10 dice and try to make them all show the same number.
- Click a die to "hold" it so it won't re-roll. Keep rolling the rest until all dice match.

## Live demo

Try the project here: https://tenzies-game-zc9c.vercel.app/

## Features

- 10 dice with hold/unhold interaction
- Roll button to re-roll non-held dice
- Visual held-state styling

## Technology

- React
- Vite
- nanoid (for unique IDs)

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

## How to play

1. Click the **Roll Dice** button to roll all dice.
2. Click any die to toggle its held state (held dice are excluded from subsequent rolls).
3. Keep rolling until all dice show the same number.

## Project structure

- `src/` — application source
- `Components/Die.jsx` — die component
- `src/App.jsx` — main game logic

## Notes

- Ensure your git commits use a configured `user.name` and `user.email` so pushes are attributed correctly.

## License

This project is provided as-is.

