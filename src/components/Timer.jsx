import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellOff } from 'lucide-react';
import Controls from './Controls';

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
      if (soundEnabled) {
        // Simple alert for now, could be an Audio play
        alert("Timer completed!");
      }
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft, soundEnabled]);

  const handleStart = () => {
    if (timeLeft === 0) {
      const mins = parseInt(inputMinutes) || 0;
      const secs = parseInt(inputSeconds) || 0;
      const totalSeconds = mins * 60 + secs;
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds);
        setIsRunning(true);
      }
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setInputMinutes('');
    setInputSeconds('');
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return {
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    };
  };

  const { m, s } = formatTime(timeLeft);
  
  const isInputDisabled = isRunning || timeLeft > 0;

  return (
    <div className="glass-panel p-8 rounded-3xl w-full max-w-md mx-auto transform transition-all hover:scale-[1.02] relative">
      <button 
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        title={soundEnabled ? "Mute Alert" : "Enable Alert"}
      >
        {soundEnabled ? <Bell size={20} /> : <BellOff size={20} />}
      </button>

      <h2 className="text-2xl font-bold text-slate-300 mb-8 text-center uppercase tracking-widest">Timer</h2>
      
      {timeLeft === 0 && !isRunning ? (
        <div className="flex justify-center items-center gap-4 my-8">
          <div className="flex flex-col">
            <input 
              type="number" 
              min="0"
              max="99"
              placeholder="00"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              disabled={isInputDisabled}
              className="w-24 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-center text-4xl font-mono text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
            />
            <span className="text-xs text-slate-400 text-center mt-2 uppercase tracking-wider">Minutes</span>
          </div>
          <span className="text-4xl text-slate-500 mb-6">:</span>
          <div className="flex flex-col">
            <input 
              type="number" 
              min="0"
              max="59"
              placeholder="00"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
              disabled={isInputDisabled}
              className="w-24 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-center text-4xl font-mono text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
            />
            <span className="text-xs text-slate-400 text-center mt-2 uppercase tracking-wider">Seconds</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center font-mono text-7xl font-light text-white tracking-wider my-8 drop-shadow-md">
          <span>{m}</span>
          <span className="mx-2 text-slate-500 animate-pulse">:</span>
          <span>{s}</span>
        </div>
      )}

      <Controls 
        isRunning={isRunning} 
        onStart={handleStart} 
        onPause={handlePause} 
        onReset={handleReset} 
      />
    </div>
  );
};

export default Timer;
