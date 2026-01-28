import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RefreshCw } from "lucide-react";

// --- COMPONENT: Bubble Sort Visualizer ---
const BubbleSortVisualizer = () => {
  const [arr, setArr] = useState([50, 30, 70, 20, 90, 10]);
  const [sorting, setSorting] = useState(false);

  const runSort = async () => {
    setSorting(true);
    let tempArr = [...arr];
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length - i - 1; j++) {
        if (tempArr[j] > tempArr[j + 1]) {
          // Swap
          let temp = tempArr[j];
          tempArr[j] = tempArr[j + 1];
          tempArr[j + 1] = temp;
          setArr([...tempArr]);
          await new Promise((r) => setTimeout(r, 600)); // Animation Delay
        }
      }
    }
    setSorting(false);
  };

  const reset = () => setArr([50, 30, 70, 20, 90, 10]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        <button
          onClick={runSort}
          disabled={sorting}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <Play size={16} /> Sort
        </button>
        <button
          onClick={reset}
          disabled={sorting}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded"
        >
          <RefreshCw size={16} /> Reset
        </button>
      </div>

      <div className="flex items-end gap-2 h-64 border-b-2 border-slate-400 p-4">
        {arr.map((val, idx) => (
          <motion.div
            layout // Magic Framer Motion prop that animates position changes automatically
            key={idx} // Using Index is risky in some apps, but okay for bubble sort swaps
            className="w-8 bg-indigo-500 rounded-t-md text-xs text-white flex items-end justify-center pb-1"
            style={{ height: `${val * 3}px` }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {val}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
