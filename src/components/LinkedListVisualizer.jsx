import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LinkedListVisualizer = () => {
  const [list, setList] = useState([10, 20, 30]);
  const [val, setVal] = useState("");

  const append = () => {
    if (!val) return;
    setList([...list, parseInt(val)]);
    setVal("");
  };

  const prepend = () => {
    if (!val) return;
    setList([parseInt(val), ...list]);
    setVal("");
  };

  const removeHead = () => setList(list.slice(1));
  const removeTail = () => setList(list.slice(0, -1));

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2 flex-wrap justify-center">
        <input
          type="number"
          placeholder="Val"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="border p-2 rounded w-20"
        />
        <button
          onClick={prepend}
          className="bg-indigo-600 text-white px-3 py-2 rounded"
        >
          Prepend
        </button>
        <button
          onClick={append}
          className="bg-indigo-600 text-white px-3 py-2 rounded"
        >
          Append
        </button>
        <button
          onClick={removeHead}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Del Head
        </button>
        <button
          onClick={removeTail}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Del Tail
        </button>
      </div>

      <div className="flex items-center gap-0 overflow-x-auto p-8 max-w-full">
        <AnimatePresence>
          {list.map((item, i) => (
            <motion.div
              key={`${item}-${i}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center"
            >
              {/* The Node */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 border-2 border-indigo-600 rounded bg-white dark:bg-slate-800 flex">
                  <div className="w-2/3 flex items-center justify-center font-bold text-indigo-800 border-r border-indigo-200">
                    {item}
                  </div>
                  <div className="w-1/3 bg-indigo-50"></div>
                </div>
                {i === 0 && (
                  <span className="text-xs text-indigo-500 font-bold mt-1">
                    HEAD
                  </span>
                )}
                {i === list.length - 1 && (
                  <span className="text-xs text-indigo-500 font-bold mt-1">
                    TAIL
                  </span>
                )}
              </div>

              {/* The Pointer Arrow */}
              {i < list.length - 1 ? (
                <div className="w-12 h-1 bg-indigo-300 mx-1 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-8 border-transparent border-l-indigo-300"></div>
                </div>
              ) : (
                <div className="ml-2 flex flex-col items-center opacity-50">
                  <div className="w-8 h-8 border-2 border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400">
                    NULL
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <div className="text-slate-400">List is empty (Head = null)</div>
        )}
      </div>
    </div>
  );
};
export default LinkedListVisualizer;
