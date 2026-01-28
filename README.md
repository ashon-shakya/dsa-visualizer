Here is the complete README.md file content. You can copy this directly into your project.

Markdown

# 🚀 DSA Visualizer

A fully interactive, animated React application for learning Data Structures and Algorithms. This tool provides step-by-step visualizations for linear structures, non-linear hierarchies, and core algorithms, all wrapped in a modern, responsive UI with Dark Mode support.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 1. 🏗 Linear Data Structures

- **Arrays:** Visualize insertion, deletion at index, and memory shifting.
- **Linked Lists:** Animated nodes with pointers. Supports `Prepend`, `Append`, `Delete Head/Tail`.
- **Stacks:** LIFO visualization with `Push` and `Pop` animations.
- **Queues:** FIFO visualization with `Enqueue` and `Dequeue` animations.

### 2. 🌳 Non-Linear Data Structures

- **Trees:** Universal renderer for Simple Trees, Binary Trees, BST, and AVL Trees.
  - _Includes auto-balancing animations for AVL Trees._
- **B-Trees / B+ Trees:** Visualization of multi-key nodes and splitting logic (Degree-3 simulation).
- **Graphs:** Interactive "Click-to-Draw" Canvas.
  - Supports **Undirected**, **Directed**, and **Weighted** graphs.

### 3. ⚡ Algorithms

- **Sorting:** Side-by-side visualization of **Bubble Sort**, **Selection Sort**, **Insertion Sort**, and **Quick Sort**.
- **Searching:**
  - **Linear Search:** Scans every element.
  - **Binary Search:** Visualizes the "divide and conquer" range reduction.
- **Dynamic Programming:** Visualizes **Fibonacci Memoization** (Tree recursion vs. Cache hits).

### 4. 🎨 UI / UX

- **Dark Mode:** Fully supported system-wide dark theme toggle.
- **Responsive Design:** Built with Tailwind CSS for mobile and desktop compatibility.
- **Smooth Animations:** Powered by `framer-motion` for fluid state transitions.

---

## 🛠 Tech Stack

- **Frontend:** [React.js](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/dsa-visualizer.git](https://github.com/your-username/dsa-visualizer.git)
cd dsa-visualizer
```

### 2\. Install Dependencies

Bash

```
npm install framer-motion lucide-react tailwindcss

```

### 3\. Configure Tailwind CSS

Initialize Tailwind if you haven't already:

Bash

```
npx tailwindcss init -p

```

**Crucial Step:** Open `tailwind.config.js`. If your project uses `"type": "module"`, ensure you use the `export default` syntax and enable `darkMode: 'class'`:

JavaScript

```
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- Required for Dark Mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

### 4\. Start the Application

Bash

```
npm start
# OR if using Vite
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or the port shown in your terminal) to view it in the browser.

---

## 📂 Project Structure

Bash

```
src/
├── App.js                  # Main entry point & Logic Router
├── data/
│   └── topicData.js        # Static content (Descriptions, Complexity, Code snippets)
├── components/
│   ├── ArrayVisualizer.jsx
│   ├── StackVisualizer.jsx
│   ├── BSTVisualizer.jsx
│   ├── GraphVisualizer.jsx # The interactive canvas
│   ├── SortingVisualizer.jsx
│   └── ... (other visualizers)
└── index.css               # Tailwind directives (@tailwind base; etc.)

```

---

## 🎮 How to Use

1.  **Navigation:** Select a category (Linear, Non-Linear, Algo) from the main menu.

2.  **Interaction:**
    - **Stacks/Queues:** Enter a number and click Push/Enqueue.

    - **Graphs:** Click anywhere in the white box to add a Node. Click two nodes consecutively to draw an Edge.

    - **Sorting:** Click "Run" to watch the algorithm sort the bars.

3.  **Dark Mode:** Click the Sun/Moon icon in the top right corner to toggle themes.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add a new algorithm (e.g., Merge Sort, Dijkstra's Algorithm), feel free to fork the repo and submit a Pull Request.

1.  Fork the Project

2.  Create your Feature Branch (`git checkout -b feature/AmazingAlgo`)

3.  Commit your Changes (`git commit -m 'Add AmazingAlgo'`)

4.  Push to the Branch (`git push origin feature/AmazingAlgo`)

5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
