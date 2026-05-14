import React, { useState, useEffect, useRef } from 'react';
import Controls from './Controls';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // 2 digits

    return {
      h: hours.toString().padStart(2, '0'),
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0'),
      ms: milliseconds.toString().padStart(2, '0'),
    };
  };

  const { h, m, s, ms } = formatTime(time);

  return (
    <div className="glass-panel p-8 rounded-3xl w-full max-w-md mx-auto transform transition-all hover:scale-[1.02]">
      <h2 className="text-2xl font-bold text-slate-300 mb-8 text-center uppercase tracking-widest">Stopwatch</h2>
      
      <div className="flex items-center justify-center font-mono text-6xl font-light text-white tracking-wider my-8 drop-shadow-md">
        <div className="flex flex-col items-center">
          <span>{h}</span>
        </div>
        <span className="mx-1 text-slate-500 animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span>{m}</span>
        </div>
        <span className="mx-1 text-slate-500 animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span>{s}</span>
        </div>
        <span className="mx-1 text-slate-500 animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl text-emerald-400 mt-2">{ms}</span>
        </div>
      </div>

      <Controls 
        isRunning={isRunning} 
        onStart={handleStart} 
        onPause={handlePause} 
        onReset={handleReset} 
      />
    </div>
  );
};

export default Stopwatch;
