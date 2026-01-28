import { useState } from "react";
import { motion } from "framer-motion";

// --- COMPONENT: Universal Tree Visualizer (Simple, Binary, BST, AVL) ---
const UniversalTreeVisualizer = ({ mode }) => {
  const [tree, setTree] = useState(null);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");

  // --- AVL UTILS ---
  const getHeight = (n) => (n ? n.height : 0);
  const getBalance = (n) => (n ? getHeight(n.left) - getHeight(n.right) : 0);

  const rightRotate = (y) => {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
  };

  const leftRotate = (x) => {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    return y;
  };

  const insertAVL = (node, value, idCounter) => {
    if (!node)
      return { value, left: null, right: null, height: 1, id: idCounter.val++ };

    if (value < node.value) node.left = insertAVL(node.left, value, idCounter);
    else if (value > node.value)
      node.right = insertAVL(node.right, value, idCounter);
    else return node; // No duplicates

    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    const balance = getBalance(node);

    // Left Left
    if (balance > 1 && value < node.left.value) return rightRotate(node);
    // Right Right
    if (balance < -1 && value > node.right.value) return leftRotate(node);
    // Left Right
    if (balance > 1 && value > node.left.value) {
      node.left = leftRotate(node.left);
      return rightRotate(node);
    }
    // Right Left
    if (balance < -1 && value < node.right.value) {
      node.right = rightRotate(node.right);
      return leftRotate(node);
    }
    return node;
  };

  const insertNode = (root, value, type, idCounter) => {
    // Standard Insert (BST/Binary)
    if (!root)
      return {
        value,
        left: null,
        right: null,
        children: [],
        id: idCounter.val++,
      };

    if (type === "simpleTree") {
      // For simple tree, we just add as a child to the first node found (Simplified)
      // Real app would ask "Where to insert?"
      if (root.children.length < 3) {
        root.children.push({ value, children: [], id: idCounter.val++ });
      } else {
        insertNode(root.children[0], value, type, idCounter); // Recurse down
      }
      return root;
    }

    if (value < root.value)
      root.left = insertNode(root.left, value, type, idCounter);
    else if (value > root.value)
      root.right = insertNode(root.right, value, type, idCounter);
    return root;
  };

  const handleInsert = () => {
    if (!val) return;
    const num = parseInt(val);
    let idCounter = { val: Date.now() }; // Hack for unique IDs

    let newRoot;
    if (mode === "avl") {
      newRoot = insertAVL(tree, num, idCounter);
    } else {
      newRoot = insertNode(
        tree ? JSON.parse(JSON.stringify(tree)) : null,
        num,
        mode,
        idCounter,
      );
    }
    setTree({ ...newRoot }); // Spread to force re-render
    setVal("");
  };

  // Recursive Renderer
  const TreeNode = ({ node, x, y, level, parentX, parentY }) => {
    if (!node) return null;
    const gap = 200 / level; // Dynamic gap

    return (
      <>
        {/* Line from Parent */}
        {parentX !== null && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <line
              x1={`calc(50% + ${parentX}px)`}
              y1={parentY + 20}
              x2={`calc(50% + ${x}px)`}
              y2={y + 20}
              stroke="#94a3b8"
              strokeWidth="2"
            />
          </svg>
        )}

        {/* The Node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-slate-200 
            ${mode === "avl" ? "bg-indigo-600" : "bg-slate-600"}`}
          style={{ left: `calc(50% + ${x}px - 20px)`, top: `${y}px` }}
        >
          {node.value}
        </motion.div>

        {/* Children Render Logic */}
        {mode === "simpleTree" ? (
          node.children.map((child, i) => (
            <TreeNode
              key={child.id}
              node={child}
              x={x + (i - 1) * 60}
              y={y + 80}
              level={level + 1}
              parentX={x}
              parentY={y}
            />
          ))
        ) : (
          <>
            <TreeNode
              node={node.left}
              x={x - gap}
              y={y + 60}
              level={level + 1}
              parentX={x}
              parentY={y}
            />
            <TreeNode
              node={node.right}
              x={x + gap}
              y={y + 60}
              level={level + 1}
              parentX={x}
              parentY={y}
            />
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="border p-2 rounded w-24"
          placeholder="Num"
        />
        <button
          onClick={handleInsert}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow-sm hover:bg-indigo-700"
        >
          Insert ({mode === "avl" ? "Auto-Balance" : "Standard"})
        </button>
        <button
          onClick={() => setTree(null)}
          className="bg-slate-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>
      <div className="relative w-full h-[400px] border border-slate-200 rounded-lg bg-slate-50 overflow-hidden shadow-inner">
        <div className="absolute top-4 left-0 w-full h-full">
          {tree && (
            <TreeNode
              node={tree}
              x={0}
              y={20}
              level={1.5}
              parentX={null}
              parentY={null}
            />
          )}
          {!tree && (
            <div className="flex h-full items-center justify-center text-slate-300">
              Empty Tree
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversalTreeVisualizer;
