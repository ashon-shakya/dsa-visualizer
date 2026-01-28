import { useState } from "react";
import { motion } from "framer-motion";

// --- COMPONENT: Graph Visualizer (Interactive Canvas) ---
const GraphVisualizer = ({ mode }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null); // For creating edges
  const [weightInput, setWeightInput] = useState("1");

  // Helper: Add Node at mouse position
  const handleCanvasClick = (e) => {
    // Prevent adding node if we just clicked an existing node
    if (e.target.closest(".node-element")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Limit max nodes to prevent chaos
    if (nodes.length >= 10) return;

    const newNode = {
      id: nodes.length,
      label: String.fromCharCode(65 + nodes.length), // A, B, C...
      x,
      y,
    };
    setNodes([...nodes, newNode]);
  };

  // Helper: Handle Node Selection (for Edges)
  const handleNodeClick = (id) => {
    if (selectedNode === null) {
      // First click: Select Source
      setSelectedNode(id);
    } else {
      // Second click: Select Target
      if (selectedNode === id) {
        setSelectedNode(null); // Deselect if same node
        return;
      }

      // Check if edge exists
      const exists = edges.find(
        (e) =>
          (e.u === selectedNode && e.v === id) ||
          (mode === "undirectedGraph" && e.u === id && e.v === selectedNode),
      );

      if (!exists) {
        setEdges([
          ...edges,
          {
            u: selectedNode,
            v: id,
            weight:
              mode === "weightedGraph" ? parseInt(weightInput) || 1 : null,
          },
        ]);
      }
      setSelectedNode(null);
    }
  };

  const reset = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Controls */}
      <div className="flex gap-4 items-center bg-slate-100 p-2 rounded-lg border border-slate-200">
        <div className="text-xs text-slate-500 font-bold uppercase">
          {mode === "undirectedGraph" && "Undirected Mode"}
          {mode === "directedGraph" && "Directed Mode"}
          {mode === "weightedGraph" && "Weighted Mode"}
        </div>

        {mode === "weightedGraph" && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Next Edge Weight:</span>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="w-16 p-1 border rounded text-sm"
            />
          </div>
        )}

        <button
          onClick={reset}
          className="bg-slate-500 text-white px-3 py-1 rounded text-sm hover:bg-slate-600"
        >
          Reset Board
        </button>
      </div>

      <p className="text-sm text-slate-500 italic">
        Click empty space to add Node. Click two nodes to connect them.
      </p>

      {/* The Canvas */}
      <div
        onClick={handleCanvasClick}
        className="relative w-full h-[400px] border-2 border-slate-300 rounded-xl bg-slate-50 overflow-hidden cursor-crosshair shadow-inner"
      >
        {/* SVG Layer for Edges */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Define Arrow Marker for Directed Graphs */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="28"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>

          {edges.map((edge, i) => {
            const u = nodes[edge.u];
            const v = nodes[edge.v];
            if (!u || !v) return null;

            return (
              <g key={i}>
                <line
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke="#64748b"
                  strokeWidth="2"
                  markerEnd={
                    mode !== "undirectedGraph" ? "url(#arrowhead)" : ""
                  }
                />
                {mode === "weightedGraph" && (
                  <g>
                    {/* Draw a small badge for the weight in the middle of the line */}
                    <rect
                      x={(u.x + v.x) / 2 - 10}
                      y={(u.y + v.y) / 2 - 10}
                      width="20"
                      height="20"
                      fill="white"
                      stroke="#cbd5e1"
                    />
                    <text
                      x={(u.x + v.x) / 2}
                      y={(u.y + v.y) / 2}
                      dy="5"
                      textAnchor="middle"
                      className="text-xs font-bold fill-slate-700"
                    >
                      {edge.weight}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Render Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => handleNodeClick(node.id)}
            className={`node-element absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center text-white font-bold cursor-pointer border-2 transition-colors shadow-lg
              ${selectedNode === node.id ? "bg-indigo-600 border-indigo-300 scale-110" : "bg-slate-700 border-white hover:bg-slate-600"}`}
            style={{ left: node.x, top: node.y }}
          >
            {node.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GraphVisualizer;
