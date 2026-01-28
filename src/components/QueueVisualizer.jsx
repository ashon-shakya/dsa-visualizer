import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");

  const enqueue = () => {
    if (!inputValue) return;
    setQueue([...queue, parseInt(inputValue)]);
    setInputValue("");
  };

  const dequeue = () => {
    setQueue((prev) => prev.slice(1));
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2 flex-col justify-center items-center">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded text-black w-80"
          placeholder="Value"
        />
        <div className="flex gap-2">
          <button
            onClick={enqueue}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Enqueue
          </button>
          <button
            onClick={dequeue}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Dequeue
          </button>
        </div>
      </div>

      {/* Queue Container */}
      <div className="flex items-center p-4 min-h-[100px] border-t-4 border-b-4 border-slate-300 bg-slate-50 relative min-w-[300px] justify-center gap-2">
        <span className="absolute left-2 text-xs font-bold text-slate-400 uppercase rotate-[-90deg]">
          Front
        </span>
        <span className="absolute right-2 text-xs font-bold text-slate-400 uppercase rotate-[-90deg]">
          Rear
        </span>

        <AnimatePresence>
          {queue.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center text-white font-bold shadow-md"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QueueVisualizer;
