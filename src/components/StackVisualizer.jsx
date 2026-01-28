import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- COMPONENT: Stack Visualizer ---
const StackVisualizer = () => {
  const [stack, setStack] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");

  const push = () => {
    if (!inputValue) return;
    setStack((prev) => [...prev, parseInt(inputValue)]); // Add to front (visual top)
    setInputValue("");
  };

  const pop = () => {
    setStack((prev) => prev.slice(0, -1)); // Remove first (visual top)
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded text-black"
          placeholder="Value"
        />
        <button
          onClick={push}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Push
        </button>
        <button
          onClick={pop}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Pop
        </button>
      </div>

      {/* The Animation Container */}
      <div className="w-32 min-h-[300px] border-l-4 border-r-4 border-b-4 border-slate-700 rounded-b-lg flex flex-col-reverse justify-start items-center p-2 bg-slate-50/10 backdrop-blur-sm">
        <AnimatePresence>
          {stack.map((item, index) => (
            <motion.div
              key={`${item}-${index}`} // Unique key for animation
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full h-12 mb-1 bg-emerald-500 rounded flex items-center justify-center text-white font-bold shadow-md"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StackVisualizer;
