import { useState } from "react";
import { motion } from "framer-motion";

// --- COMPONENT: B-Tree / B+ Tree Visualizer (Simplified) ---
const BTreeVisualizer = ({ isPlus }) => {
  // We simulate a 2-3 Tree (Max 2 keys per node, splits on 3rd)
  const [tree, setTree] = useState({ keys: [20], children: [] });
  const [val, setVal] = useState("");

  const splitLeaf = (node) => {
    // Simplified logic: If a node has > 2 keys, split it
    if (node.keys.length > 2) {
      const midIndex = 1;
      const midVal = node.keys[midIndex];
      const left = { keys: [node.keys[0]], children: [] };
      const right = { keys: [node.keys[2]], children: [] };
      return { midVal, left, right, split: true };
    }
    return { split: false };
  };

  const insert = (node, value) => {
    if (node.children.length === 0) {
      // Leaf node
      node.keys.push(value);
      node.keys.sort((a, b) => a - b);
      return splitLeaf(node);
    }

    // Internal node - find child
    let i = 0;
    while (i < node.keys.length && value > node.keys[i]) i++;

    const res = insert(node.children[i], value);
    if (res.split) {
      node.keys.splice(i, 0, res.midVal);
      node.children.splice(i, 1, res.left, res.right);
      return splitLeaf(node);
    }
    return { split: false };
  };

  const handleInsert = () => {
    if (!val) return;
    const v = parseInt(val);
    let newTree = JSON.parse(JSON.stringify(tree)); // Deep Copy

    const res = insert(newTree, v);
    if (res.split) {
      newTree = { keys: [res.midVal], children: [res.left, res.right] };
    }
    setTree(newTree);
    setVal("");
  };

  const BNode = ({ node, x, y, level, parentX, parentY }) => {
    const width = node.keys.length * 40 + 20;

    return (
      <>
        {parentX !== null && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <line
              x1={`calc(50% + ${parentX}px)`}
              y1={parentY + 30}
              x2={`calc(50% + ${x}px)`}
              y2={y}
              stroke="#94a3b8"
              strokeWidth="2"
            />
          </svg>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute flex border-2 border-slate-700 bg-slate-800 rounded-md overflow-hidden shadow-xl"
          style={{ left: `calc(50% + ${x}px - ${width / 2}px)`, top: `${y}px` }}
        >
          {node.keys.map((k, i) => (
            <div
              key={i}
              className="w-10 h-8 flex items-center justify-center text-white border-r border-slate-600 last:border-none font-mono"
            >
              {k}
            </div>
          ))}
        </motion.div>

        {node.children.map((child, i) => {
          // Calculate offset for children centering
          const totalW = node.children.length * 80;
          const startX = x - totalW / 2 + 40;
          return (
            <BNode
              key={i}
              node={child}
              x={startX + i * 80}
              y={y + 80}
              level={level + 1}
              parentX={x}
              parentY={y}
            />
          );
        })}

        {/* B+ Tree: Add Link arrows at leaf level (simplified visual) */}
        {isPlus && node.children.length === 0 && (
          <div className="absolute top-2 -right-6 text-slate-400">→</div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="border p-2 rounded w-24"
          placeholder="Val"
        />
        <button
          onClick={handleInsert}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Insert Key
        </button>
        <button
          onClick={() => setTree({ keys: [20], children: [] })}
          className="bg-slate-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
      <div className="relative w-full h-[300px] border border-slate-200 rounded-lg bg-slate-50 overflow-hidden shadow-inner">
        <div className="absolute top-4 left-0 w-full h-full">
          <BNode
            node={tree}
            x={0}
            y={20}
            level={1}
            parentX={null}
            parentY={null}
          />
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2">
        * Visualization uses Degree-3 logic (Split on 3rd key)
      </p>
    </div>
  );
};

export default BTreeVisualizer;
