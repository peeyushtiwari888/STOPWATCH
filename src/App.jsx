import React, { useState } from 'react';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import { Timer as TimerIcon, Clock } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('stopwatch');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 tracking-tight">
            Chai<span className="text-white">Timer</span>
          </h1>
          <p className="text-slate-400 font-medium">Precision Timing Application</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex p-1 bg-slate-800/50 backdrop-blur-md rounded-2xl mb-10 shadow-xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'stopwatch' 
                ? 'bg-slate-700 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Clock size={18} />
            Stopwatch
          </button>
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'timer' 
                ? 'bg-slate-700 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <TimerIcon size={18} />
            Timer
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full flex justify-center perspective-1000">
          {activeTab === 'stopwatch' ? <Stopwatch /> : <Timer />}
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
