import { useState } from "react";
import { motion } from "framer-motion";

// --- COMPONENT: Universal Sorting Visualizer ---
const SortingVisualizer = ({ algo, title }) => {
  const [arr, setArr] = useState([50, 20, 90, 10, 30, 70, 40, 80, 60]);
  const [sorting, setSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]); // Highlighting

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // --- ALGORITHMS ---
  const bubbleSort = async (a) => {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]]; // Swap
          setArr([...a]);
          await sleep(300);
        }
        await sleep(100);
      }
    }
  };

  const selectionSort = async (a) => {
    for (let i = 0; i < a.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < a.length; j++) {
        setActiveIndices([i, j, minIdx]);
        if (a[j] < a[minIdx]) minIdx = j;
        await sleep(100);
      }
      if (minIdx !== i) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        setArr([...a]);
        await sleep(300);
      }
    }
  };

  const insertionSort = async (a) => {
    for (let i = 1; i < a.length; i++) {
      let key = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > key) {
        setActiveIndices([j, j + 1]);
        a[j + 1] = a[j];
        setArr([...a]);
        await sleep(300);
        j = j - 1;
      }
      a[j + 1] = key;
      setArr([...a]);
    }
  };

  const quickSortHelper = async (a, low, high) => {
    if (low < high) {
      let pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setActiveIndices([j, high, i]);
        await sleep(100);
        if (a[j] < pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          setArr([...a]);
          await sleep(200);
        }
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      setArr([...a]);
      await sleep(200);

      await quickSortHelper(a, low, i);
      await quickSortHelper(a, i + 2, high);
    }
  };

  const runSort = async () => {
    setSorting(true);
    let temp = [...arr];
    if (algo === "bubbleSort") await bubbleSort(temp);
    if (algo === "selectionSort") await selectionSort(temp);
    if (algo === "insertionSort") await insertionSort(temp);
    if (algo === "quickSort") await quickSortHelper(temp, 0, temp.length - 1);
    setActiveIndices([]);
    setSorting(false);
  };

  const reset = () => {
    setArr(
      Array.from({ length: 9 }, () => Math.floor(Math.random() * 90) + 10),
    );
    setActiveIndices([]);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2">
        <button
          onClick={runSort}
          disabled={sorting}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Run {title}
        </button>
        <button
          onClick={reset}
          disabled={sorting}
          className="bg-slate-500 text-white px-4 py-2 rounded"
        >
          Randomize
        </button>
      </div>
      <div className="flex items-end gap-2 h-64 border-b-2 border-slate-300 p-4 w-full justify-center">
        {arr.map((val, idx) => (
          <motion.div
            layout
            key={idx} // Index key is acceptable here for simple swap animations
            className={`w-8 rounded-t-md text-xs text-white flex items-end justify-center pb-1 ${
              activeIndices.includes(idx) ? "bg-red-500" : "bg-indigo-500"
            }`}
            style={{ height: `${val * 2.5}px` }}
          >
            {val}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
