import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- COMPONENT: Binary Search Tree Visualizer ---
const BSTVisualizer = () => {
  // We store the tree as a simple object structure
  // Root node: { value: 50, x: 0, y: 0, left: null, right: null }
  const [tree, setTree] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Enter a number to insert");

  // Helper to insert a value into the tree object
  const insertNode = (root, value, x, y, level) => {
    if (!root) {
      return { value, x, y, left: null, right: null, id: Math.random() };
    }

    // Gap decreases as we go deeper to prevent overlapping
    const gap = 100 / (level + 1.2);

    if (value < root.value) {
      root.left = insertNode(root.left, value, x - gap, y + 60, level + 1);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value, x + gap, y + 60, level + 1);
    } else {
      setMessage("Value already exists!");
    }
    return root;
  };

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    // We clone the tree to trigger a re-render
    const newTree = insertNode(
      tree ? JSON.parse(JSON.stringify(tree)) : null, // Deep copy hack
      val,
      0, // Root X position (relative center)
      0, // Root Y position
      1, // Level
    );

    setTree(newTree);
    setInputValue("");
    setMessage("");
  };

  const reset = () => {
    setTree(null);
    setMessage("Tree cleared");
  };

  // Recursive component to draw nodes and connections
  const TreeNode = ({ node }) => {
    if (!node) return null;

    return (
      <>
        {/* Draw Connections first so they are behind nodes */}
        {node.left && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
            style={{ zIndex: -1 }}
          >
            <line
              x1={`calc(50% + ${node.x}px)`}
              y1={node.y + 20}
              x2={`calc(50% + ${node.left.x}px)`}
              y2={node.left.y + 20}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
          </svg>
        )}
        {node.right && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
            style={{ zIndex: -1 }}
          >
            <line
              x1={`calc(50% + ${node.x}px)`}
              y1={node.y + 20}
              x2={`calc(50% + ${node.right.x}px)`}
              y2={node.right.y + 20}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
          </svg>
        )}

        {/* Draw the Node itself */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white"
          style={{
            left: `calc(50% + ${node.x}px - 20px)`, // Center horizontally based on offset
            top: `${node.y}px`,
          }}
        >
          {node.value}
        </motion.div>

        {/* Recursively draw children */}
        <TreeNode node={node.left} />
        <TreeNode node={node.right} />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded text-black w-24"
          placeholder="Num"
        />
        <button
          onClick={handleInsert}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Insert
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>
      <p className="text-sm text-slate-500 h-4">{message}</p>

      {/* Tree Container */}
      <div className="relative w-full h-[300px] border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
        <div className="absolute top-8 left-0 w-full h-full">
          <AnimatePresence>{tree && <TreeNode node={tree} />}</AnimatePresence>
          {!tree && (
            <div className="flex justify-center items-center h-full text-slate-300">
              Tree is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BSTVisualizer;
