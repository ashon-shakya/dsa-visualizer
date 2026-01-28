import { useState } from "react";

// --- COMPONENT: Search Visualizer ---
const SearchVisualizer = ({ mode }) => {
  // We need a sorted array for Binary Search
  const [arr] = useState(
    mode === "binarySearch"
      ? [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      : [42, 15, 8, 90, 23, 10, 55, 70, 33, 60],
  );

  const [target, setTarget] = useState("");
  const [activeIdx, setActiveIdx] = useState(null);
  const [found, setFound] = useState(false);
  const [discardedIndices, setDiscardedIndices] = useState([]); // For Binary Search grey-out

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const runLinear = async () => {
    setFound(false);
    setDiscardedIndices([]);
    const t = parseInt(target);
    for (let i = 0; i < arr.length; i++) {
      setActiveIdx(i);
      await sleep(400);
      if (arr[i] === t) {
        setFound(true);
        return;
      }
    }
    setActiveIdx(null);
  };

  const runBinary = async () => {
    setFound(false);
    setDiscardedIndices([]);
    const t = parseInt(target);
    let left = 0,
      right = arr.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      setActiveIdx(mid);
      await sleep(800);

      if (arr[mid] === t) {
        setFound(true);
        return;
      }

      // Visualize discarding
      const newDiscarded = [];
      if (arr[mid] < t) {
        for (let i = left; i <= mid; i++) newDiscarded.push(i);
        left = mid + 1;
      } else {
        for (let i = mid; i <= right; i++) newDiscarded.push(i);
        right = mid - 1;
      }
      setDiscardedIndices((prev) => [...prev, ...newDiscarded]);
      await sleep(400);
    }
    setActiveIdx(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border p-2 rounded w-24"
          placeholder="Target"
        />
        <button
          onClick={mode === "binarySearch" ? runBinary : runLinear}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          Find
        </button>
      </div>

      <div className="flex gap-2 flex-wrap justify-center max-w-[500px]">
        {arr.map((val, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 flex items-center justify-center font-bold border-2 rounded transition-all duration-300
              ${
                activeIdx === idx
                  ? found
                    ? "bg-green-500 text-white border-green-600 scale-110"
                    : "bg-yellow-400 text-black border-yellow-500 scale-110"
                  : discardedIndices.includes(idx)
                    ? "bg-slate-200 text-slate-300 border-slate-200"
                    : "bg-white border-slate-300 text-slate-700"
              }
            `}
          >
            {val}
          </div>
        ))}
      </div>
      {found && <p className="text-green-600 font-bold">Found!</p>}
    </div>
  );
};

export default SearchVisualizer;
