import React, { useState } from "react";

// --- COMPONENT: DP Visualizer (Fibonacci) ---
const DPVisualizer = () => {
  const [logs, setLogs] = useState([]);
  const [memo, setMemo] = useState({});
  const [calculating, setCalculating] = useState(false);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const fib = async (n, currentMemo) => {
    // Check Memo
    if (currentMemo[n] !== undefined) {
      setLogs((l) => [
        ...l,
        `Fib(${n}) found in Memo: ${currentMemo[n]} (Skipping calc)`,
      ]);
      return currentMemo[n];
    }

    setLogs((l) => [...l, `Calculating Fib(${n})...`]);
    await sleep(400);

    if (n <= 1) return n;

    const left = await fib(n - 1, currentMemo);
    const right = await fib(n - 2, currentMemo);
    const res = left + right;

    currentMemo[n] = res;
    setMemo({ ...currentMemo }); // Update Visual Memo
    setLogs((l) => [...l, `Fib(${n}) = ${res}. Stored in Memo.`]);
    return res;
  };

  const runDP = async () => {
    setCalculating(true);
    setLogs([]);
    setMemo({});
    await fib(5, {});
    setCalculating(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <button
        onClick={runDP}
        disabled={calculating}
        className="bg-purple-600 text-white px-6 py-2 rounded"
      >
        Calculate Fib(5) with Memoization
      </button>

      <div className="flex gap-8 w-full">
        {/* Left: The Memo Table */}
        <div className="w-1/3 bg-slate-50 p-4 rounded border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-2 border-b">
            Memo Table (Cache)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-xs font-bold text-slate-400">N</div>
            <div className="text-xs font-bold text-slate-400">Result</div>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <React.Fragment key={n}>
                <div className="bg-white dark:bg-slate-800 border p-1 text-center">
                  {n}
                </div>
                <div
                  className={`border p-1 text-center font-bold ${memo[n] !== undefined ? "bg-green-100 text-green-700" : "bg-slate-100"}`}
                >
                  {memo[n] !== undefined ? memo[n] : "-"}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right: Execution Log */}
        <div className="w-2/3 bg-slate-900 p-4 rounded text-xs font-mono text-green-400 h-64 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 border-b border-slate-800 pb-1">
              {log.includes("Skipping") ? (
                <span className="text-yellow-400">{log}</span>
              ) : (
                log
              )}
            </div>
          ))}
          {logs.length === 0 && (
            <span className="text-slate-500">
              Click button to start trace...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DPVisualizer;
