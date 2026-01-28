import { useEffect, useState } from "react";
import { ArrowLeft, Database, Code, Layers, Sun, Moon } from "lucide-react"; // Added Sun/Moon icons
import StackVisualizer from "./components/StackVisualizer";
import ArrayVisualizer from "./components/ArrayVisualizer";
import QueueVisualizer from "./components/QueueVisualizer";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import UniversalTreeVisualizer from "./components/UniversalTreeVisualizer";
import BTreeVisualizer from "./components/BTreeVisualizer";
import GraphVisualizer from "./components/GraphVisualizer";
import SortingVisualizer from "./components/SortingVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";
import DPVisualizer from "./components/DPVisualizer";

// Topic Data
import TOPIC_DATA from "./data/topicData";

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isDark, setIsDark] = useState(true); // Default to dark
  const [view, setView] = useState("menu"); // menu, linear, nonlinear, algo
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Helper to render the content page based on selection
  const renderVisualizer = () => {
    if (!selectedTopic) return null;
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedTopic(null)}
          className="flex items-center text-slate-500 mb-6 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Info */}
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 transition-colors">
              {TOPIC_DATA[selectedTopic].title}
            </h1>
            <span className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-2 py-1 rounded text-sm font-semibold transition-colors">
              {TOPIC_DATA[selectedTopic].type}
            </span>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              {TOPIC_DATA[selectedTopic].desc}
            </p>

            <div className="mt-6 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="font-bold text-slate-700 dark:text-slate-300">
                Time Complexity
              </h3>
              <p className="font-mono text-red-600 dark:text-red-400 mt-1">
                {TOPIC_DATA[selectedTopic].time}
              </p>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mt-4">
                Space Complexity
              </h3>
              <p className="font-mono text-blue-600 dark:text-blue-400 mt-1">
                {TOPIC_DATA[selectedTopic].space}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
                Code Snippet
              </h3>
              <pre className="bg-slate-900 text-green-400 p-4 rounded text-sm overflow-x-auto border border-slate-800 dark:border-slate-600">
                {TOPIC_DATA[selectedTopic].code}
              </pre>
            </div>
          </div>

          {/* Right Column: Interactive Visualizer */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center min-h-[400px] transition-colors">
            <h3 className="text-slate-400 dark:text-slate-500 text-sm uppercase font-bold tracking-wider mb-8">
              Interactive Playground
            </h3>
            {/* Render Visualizers */}
            {selectedTopic === "array" && <ArrayVisualizer />}
            {selectedTopic === "stack" && <StackVisualizer />}
            {selectedTopic === "queue" && <QueueVisualizer />}
            {selectedTopic === "linkedList" && <LinkedListVisualizer />}

            {(selectedTopic === "simpleTree" ||
              selectedTopic === "binaryTree" ||
              selectedTopic === "bst" ||
              selectedTopic === "avl") && (
              <UniversalTreeVisualizer mode={selectedTopic} />
            )}

            {selectedTopic === "bTree" && <BTreeVisualizer isPlus={false} />}
            {selectedTopic === "bPlusTree" && <BTreeVisualizer isPlus={true} />}

            {["undirectedGraph", "directedGraph", "weightedGraph"].includes(
              selectedTopic,
            ) && <GraphVisualizer mode={selectedTopic} />}

            {[
              "bubbleSort",
              "selectionSort",
              "insertionSort",
              "quickSort",
            ].includes(selectedTopic) && (
              <SortingVisualizer
                algo={selectedTopic}
                title={TOPIC_DATA[selectedTopic].title}
              />
            )}

            {["linearSearch", "binarySearch"].includes(selectedTopic) && (
              <SearchVisualizer mode={selectedTopic} />
            )}

            {selectedTopic === "fibDP" && <DPVisualizer />}
          </div>
        </div>
      </div>
    );
  };

  // Helper to render the Main Menu
  const renderMenu = () => (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center text-slate-800 dark:text-white mb-4 transition-colors">
        DSA{" "}
        <span className="text-indigo-600 dark:text-indigo-400">Visualizer</span>
      </h1>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-12 transition-colors">
        Select a category to explore data structures and algorithms
        interactively.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Linear Card */}
        <div
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 cursor-pointer group"
          onClick={() => setView("linear")}
        >
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Layers size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Linear Structures
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Sequential organization. Arrays, Stacks, Queues, Linked Lists.
          </p>
        </div>

        {/* Non-Linear Card */}
        <div
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 cursor-pointer group"
          onClick={() => setView("nonlinear")}
        >
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Database size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Non-Linear Structures
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Hierarchical organization. Trees, Graphs, Heaps, Maps.
          </p>
        </div>

        {/* Algorithms Card */}
        <div
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 cursor-pointer group"
          onClick={() => setView("algo")}
        >
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Code size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Algorithms
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Step-by-step procedures. Sorting, Searching, Dynamic Programming.
          </p>
        </div>
      </div>
    </div>
  );

  // Helper to render Sub-Menu (List of topics inside a category)
  const renderSubMenu = (category, items) => (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => setView("menu")}
        className="flex items-center text-slate-500 mb-6 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Home
      </button>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 capitalize transition-colors">
        {category} Data Structures
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTopic(item.id)}
            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:border-indigo-500 dark:hover:border-indigo-400 cursor-pointer hover:shadow-md transition-all flex items-center justify-between group"
          >
            <span className="font-semibold text-lg text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {item.label}
            </span>
            <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded">
              View Demo
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // --- MAIN RENDER LOGIC ---
  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 relative">
      {/* Toggle Theme Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:scale-110 transition-transform shadow-md"
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Content Render */}
      {selectedTopic
        ? renderVisualizer()
        : view === "menu"
          ? renderMenu()
          : view === "linear"
            ? renderSubMenu("Linear", [
                { id: "array", label: "Arrays" },
                { id: "stack", label: "Stack" },
                { id: "queue", label: "Queue" },
                { id: "linkedList", label: "Linked List" },
              ])
            : view === "nonlinear"
              ? renderSubMenu("Non-Linear", [
                  { id: "simpleTree", label: "Simple Tree" },
                  { id: "binaryTree", label: "Binary Tree" },
                  { id: "bst", label: "Binary Search Tree" },
                  { id: "avl", label: "AVL Tree" },
                  { id: "bTree", label: "B-Tree" },
                  { id: "bPlusTree", label: "B+ Tree" },
                  { id: "undirectedGraph", label: "Undirected Graph" },
                  { id: "directedGraph", label: "Directed Graph" },
                  { id: "weightedGraph", label: "Weighted Graph" },
                ])
              : /* Algo */
                renderSubMenu("Algorithms", [
                  { id: "linearSearch", label: "Linear Search" },
                  { id: "binarySearch", label: "Binary Search" },
                  { id: "bubbleSort", label: "Bubble Sort" },
                  { id: "selectionSort", label: "Selection Sort" },
                  { id: "insertionSort", label: "Insertion Sort" },
                  { id: "quickSort", label: "Quick Sort" },
                  { id: "fibDP", label: "Dynamic Programming (Fib)" },
                ])}
    </div>
  );
}
