# ✨ Stardust Canvas

**Where your thoughts orbit freely.**

Stardust Canvas is an infinite, cosmic-themed spatial note-taking application. It replaces the linear document with a living universe of ideas, where notes are celestial bodies, connections are gravitational tethers, and your creativity knows no bounds.

![Stardust Preview](https://via.placeholder.com/800x450?text=Stardust+Canvas+Preview)

## 🌌 Features

### 🔭 The Infinite Cosmos
*   **Spatial Canvas**: Pan, zoom, and explore an endless starfield.
*   **Celestial Nodes**: Create notes as **Planets**, **Suns**, **Asteroids**, and **Nebulae**. Each type varies in size and gravitational significance.
*   **Gravity & Physics**: Notes float and interact. Fling them across the void or watch them settle into orbits.
*   **Wormhole Navigation**: Double-click to "warp" focus to specific ideas.
*   **Soundscapes**: Generative ambient layout sounds react to your interactions (clicks, warps, connections).

### ✍️ Rich Note Taking
*   **Powerful Editor**: Built on **Lexical**, supporting **Markdown**, **Code Blocks**, **Lists**, and **Rich Text**.
*   **Smart Intelligence**:
    *   **AI Spark**: Integrated with **Google Gemini 1.5 Flash** to expand ideas, summarize text, or generate content (BYO API Key).
    *   **Mood Coloring**: Automatic color assignment based on content keywords (e.g., "urgent" turns red, "idea" turns blue).

### 🛠️ Advanced Tools
*   **Semantic Zoom**: Content detail adjusts based on your zoom level—see titles from afar, full content up close.
*   **Minimap**: A radar view of your entire galaxy of notes.
*   **Black Hole Deletion**: Drag unwanted notes into the singularity to destroy them.
*   **Local-First Privacy**: All data orbits locally in your browser using **IndexedDB** (via Dexie.js).

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation

1.  **Clone the Universe**
    ```bash
    git clone https://github.com/yourusername/stardust-canvas.git
    cd stardust-canvas
    ```

2.  **Install Life Support (Dependencies)**
    ```bash
    npm install
    ```

3.  **Launch Mission Control (Dev Server)**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to begin exploration.

4.  **Build for Deep Space (Production)**
    ```bash
    npm run build
    ```

### 🧠 Configuring AI
To use the "Spark" AI features:
1.  Open the **Settings** panel in the app.
2.  Enter your **Google Gemini API Key**.
3.  Your key is stored locally in your browser (obfuscated).

## 🎮 How to Use

*   **Spawn**: Double-click anywhere in empty space to open the **Creation Menu**. Pick a celestial body.
*   **Edit**: Click a planet to focus; click again to edit text. Use the overlay editor for rich text.
*   **Link**: Drag from the "handle" (dot) on a selected planet to another to create a gravitational tether.
*   **Physics**: Drag a planet to move it. Fling it to see it drift.
*   **Delete**: Drag a planet to the **Black Hole** (bottom-right) until it is consumed.

## 🏗️ Cosmic Architecture (Developer Guide)

Stardust Canvas uses a hybrid architecture to maintain 60fps performance even with complex simulations.

### The Engine (`src/engine`)
*   **Game Loop**: A custom `requestAnimationFrame` loop manages physics and rendering separate from React's render cycle.
*   **Visual Registry**: Direct DOM manipulation updates note positions/transforms, bypassing React reconciliation for smooth dragging and physics.
*   **ECS-Lite**: Systems like `PhysicsSystem`, `LayoutSystem`, and `SingularitySystem` operate on the world state each frame.

### The Bridge
*   **Zustand**: Manages high-level application state (notes content, selection, user preferences).
*   **React**: Renders the UI shell, overlays, and the initial DOM elements for notes.
*   **Synchronization**: The Engine reads from the Store/World state but writes position updates directly to the DOM.

### Tech Stack
*   **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
*   **State**: [Zustand](https://zustand-demo.pmnd.rs/), [Immer](https://immerjs.github.io/immer/)
*   **Editor**: [Lexical](https://lexical.dev/) (Markdown, History, Rich Text)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Motion**: [Framer Motion](https://www.framer.com/motion/) (UI Animations), [Use-Gesture](https://use-gesture.netlify.app/)
*   **Persistence**: [Dexie.js](https://dexie.org/) (IndexedDB wrapper)
*   **AI**: [Google Gemini API](https://ai.google.dev/)
*   **Utils**: [uuid](https://github.com/uuidjs/uuid), [fuse.js](https://fusejs.io/) (Search)

## 📄 License

MIT License. The universe is open for everyone.
