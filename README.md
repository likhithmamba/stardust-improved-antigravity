# ✨ Stardust Canvas

**A Particle Accelerator for Ideas.**

Stardust Canvas is an infinite, physics-based spatial note-taking engine designed to transform how you capture, organize, and explore your thoughts. Unlike traditional linear document editors, Stardust treats every note as a celestial body with mass, gravity, and velocity, creating a living universe of information.

![Stardust Preview](https://via.placeholder.com/1200x600?text=Stardust+Canvas+Preview)

---

## 🌌 The Vision

We believe that ideas are not static text on a page—they are dynamic, interconnected entities. Stardust provides a **Dual Design System** to cater to different cognitive states:

### 1. Solar Strategy (The "Day" Mode)
*   **Philosophy**: Clarity, Structure, Execution.
*   **Visuals**: Clean lines, high contrast, warm solar gradients, glassmorphic panels.
*   **Use Case**: Project management, outlining, structured planning.

### 2. Zero-Point (The "Night" Mode)
*   **Philosophy**: Creativity, Exploration, Flow.
*   **Visuals**: Deep space backgrounds, neon accents, glowing particles, holographic UI.
*   **Use Case**: Brainstorming, connecting disparate ideas, dream journaling.

---

## 🔭 The 5 Dimensional Modes

Stardust offers five distinct ways to view and interact with your data, seamlessly switchable at any time:

### 1. 🌀 Void Mode (Freeform)
The default state. An infinite canvas where notes float freely.
*   **Physics**: Notes have gravity and repel each other slightly to avoid overlap.
*   **Interaction**: Fling notes to send them drifting; they will naturally cluster based on connections.

### 2. 🔢 Matrix Mode (Structured Grid)
A rigid, tabular organization of your chaos.
*   **Layout**: forces notes into a clean grid based on tags or priority.
*   **Best For**: Triage, inventorying ideas, and ensuring nothing is lost in the void.

### 3. 🌈 Prism Mode (Knowledge Graph)
A network-focused view emphasizing connections.
*   **Layout**: Force-directed graph where edge strength determines proximity.
*   **Best For**: Visualizing complex relationships, mind mapping, and finding hidden patterns.

### 4. 🪐 Orbital Mode (Priority Rings)
A concentric system revolving around you.
*   **Layout**: Important/High-priority notes orbit closer to the center (the "Core"). Lower priority notes drift in the outer rim.
*   **Best For**: Daily focus, prioritizing tasks, and "Radar" view of your life.

### 5. ⏳ Timeline Mode (Chronological)
A linear projection of time.
*   **Layout**: Notes are distributed along a horizontal or vertical axis based on creation or modification date.
*   **Best For**: Project histories, journaling, and understanding the evolution of your thoughts.

---

## ⚛️ Core Mechanics

### 🚀 Infinite Canvas & Semantic Zoom
*   **Zoom Out**: See the galaxy. Notes fade into simple stars.
*   **Zoom In**: detailed content reveals itself.
*   **Smooth Pan**: infinite panning in any direction.

### 🍎 Physics Engine
*   **Gravity**: Larger notes (more content) attract smaller related notes.
*   **Decay**: (Optional) Unvisited notes slowly lose "light" and drift to the archives, mimicking natural memory fading.
*   **Collision**: Notes bounce and interact, giving a tactile feel to your data.

### 🕳️ The Black Hole
*   **Deletion**: There is no trash can. To delete a note, you must physically drag it into the event horizon of the Black Hole in the corner. Watch it get spaghettified and consumed.

### 🧠 AI Spark (Gemini 1.5)
Inside every note is an AI core.
*   **Expand**: Turn a bullet point into a paragraph.
*   **Summarize**: Collapse a wall of text into a haiku.
*   **Connect**: Ask the AI to find relationships between two distant notes.

---

## 🛠️ Technological Event Horizon

Stardust is built on the bleeding edge of web technologies to ensure 60FPS performance even with thousands of active physics bodies.

### Core Stack
*   **Frontend Framework**: [React 19](https://react.dev/) (Leveraging latest concurrent features)
*   **Build Tool**: [Vite](https://vitejs.dev/) (Instant HMR)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)

### Visuals & Physics
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first, high performance)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (Complex UI transitions)
*   **Physics Loop**: Custom `requestAnimationFrame` engine detached from React render cycle for maximum smoothness.

### State & Data
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) + [Immer](https://immerjs.github.io/immer/) (Transient updates for high-frequency physics)
*   **Persistence**: [Dexie.js](https://dexie.org/) (IndexedDB wrapper for offline-first, local-only storage)
*   **Rich Text**: [Lexical](https://lexical.dev/) (Facebook's extensible text editor framework)

---

## 🚀 Getting Started

### Prerequisites
*   Node.js v18+
*   npm or yarn

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/stardust-canvas.git
    cd stardust-canvas
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Access the universe at `http://localhost:5173`

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

*"We are all made of starstuff."*
