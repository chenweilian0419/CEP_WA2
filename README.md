# Gravitational Attractor Simulation

An interactive gravitational simulation built with p5.js, where you can add, remove, and observe attractors with adjustable gravity, zoom, and velocity display.

## 🔗 Demo

View the live demo on Youtube

```
https://www.youtube.com/watch?v=7aZ7zAnE7GY
```

*(Enable Pages in ****Settings → Pages****, source: **`main`** branch, root folder.)*

## 📂 Repository Structure

```
CEP_WA2/
├── index.html        # Main HTML file
├── style.css         # Styling for canvas and controls
├── sketch.js         # p5.js sketch and interaction logic
├── attractor.js      # Attractor class definition
├── p5.js             # p5.js core library
└── p5.sound.min.js   # p5.js sound library (included)
```

## 🚀 Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chenweilian0419/CEP_WA2.git
   cd CEP_WA2
   ```

2. **Serve locally**:

   ```bash
   npx http-server .
   # Visit http://localhost:8080 in your browser
   ```

3. Alternatively, simply **open** `index.html` in your browser.

## 🎮 Controls & Interaction

- **Click Canvas**: Add a new attractor at cursor (or remove if clicking on an existing one).
- **Zoom Slider** / **Mouse Wheel**: Zoom in/out.
- **Gravity Slider**: Adjust the gravitational strength.
- **Pan View**: Arrow keys or `W`/`A`/`S`/`D`.
- **Toggle Velocity Arrows**: Click the `no arrow(v)` button or press ``.

## 🛠️ Features

- **Trails**: Each attractor leaves a fading trail to visualize its path.
- **Collision & Merge**: Attractors merge on collision, conserving momentum.

## 🧩 Dependencies

- [p5.js](https://p5js.org/)

---

*© 2025 chenweilian0419*

