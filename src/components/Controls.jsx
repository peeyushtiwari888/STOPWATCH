import React from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

const Controls = ({ isRunning, onStart, onPause, onReset }) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-110 active:scale-95"
        >
          <Play fill="currentColor" size={28} className="ml-1" />
        </button>
      ) : (
        <button
          onClick={onPause}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-white shadow-lg shadow-amber-500/30 transition-all hover:scale-110 active:scale-95"
        >
          <Pause fill="currentColor" size={28} />
        </button>
      )}

      <button
        onClick={onReset}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        <RotateCcw size={28} />
      </button>
    </div>
  );
};

export default Controls;
