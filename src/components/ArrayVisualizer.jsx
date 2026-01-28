import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArrayVisualizer = () => {
  const [arr, setArr] = useState([10, 20, 30, 40]);
  const [val, setVal] = useState("");
  const [idx, setIdx] = useState("");

  const insert = () => {
    if (!val) return;
    const newArr = [...arr];
    const index = idx === "" ? arr.length : parseInt(idx);
    newArr.splice(index, 0, parseInt(val));
    setArr(newArr);
    setVal("");
    setIdx("");
  };

  const remove = () => {
    if (idx === "") return; // specific index required for array deletion demo
    const newArr = arr.filter((_, i) => i !== parseInt(idx));
    setArr(newArr);
    setIdx("");
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Val"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="border p-2 rounded w-20"
        />
        <input
          type="number"
          placeholder="Idx"
          value={idx}
          onChange={(e) => setIdx(e.target.value)}
          className="border p-2 rounded w-20"
        />
        <button
          onClick={insert}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Insert
        </button>
        <button
          onClick={remove}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete at Idx
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto p-4 max-w-full border-2 border-slate-200 rounded-lg min-h-[100px] items-center">
        <AnimatePresence>
          {arr.map((item, i) => (
            <motion.div
              key={`${item}-${i}`} // Composite key to ensure re-render on shift
              layout // Handles the sliding animation when elements insert/delete
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-sky-500 text-white flex items-center justify-center font-bold rounded shadow-md border-2 border-sky-600">
                {item}
              </div>
              <span className="text-xs text-slate-400 mt-2 font-mono">{i}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
