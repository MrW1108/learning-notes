
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Background } from './components/Background';
import { SnowCanvas } from './components/SnowCanvas';
import { DecoratorItem } from './types';
import { generateChristmasWish } from './services/geminiService';
import { Sparkles, Gift, Send, Volume2, VolumeX, Trash2, Stars, Trash } from 'lucide-react';

const App: React.FC = () => {
  const [items, setItems] = useState<DecoratorItem[]>([]);
  const [isTreeLit, setIsTreeLit] = useState(false);
  const [userName, setUserName] = useState('');
  const [aiWish, setAiWish] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'diy' | 'wish'>('diy');
  const [showRipples, setShowRipples] = useState<{x: number, y: number, id: number}[]>([]);

  // Sound effects simulation using Web Audio API
  const playSound = (freq: number, type: OscillatorType = 'sine', duration = 0.1) => {
    if (isMuted) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rippleId = Date.now();
    setShowRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id: rippleId }]);
    setTimeout(() => {
      setShowRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 1000);
    playSound(440, 'sine', 0.2);
  };

  const addItem = (type: DecoratorItem['type']) => {
    const newItem: DecoratorItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: window.innerWidth / 2 + (Math.random() * 200 - 100),
      y: window.innerHeight / 2 + (Math.random() * 200),
      scale: 0.8 + Math.random() * 0.4
    };
    setItems(prev => [...prev, newItem]);
    playSound(880, 'triangle', 0.1);
  };

  const handleGenerateWish = async () => {
    if (!userName.trim()) return;
    setIsGenerating(true);
    const wish = await generateChristmasWish(userName);
    setAiWish(wish);
    setIsGenerating(false);
    playSound(1200, 'sine', 0.5);
  };

  const clearAll = () => {
    setItems([]);
    setAiWish('');
    setIsTreeLit(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none" onClick={handleCanvasClick}>
      <Background />
      <SnowCanvas />

      {/* Ripples */}
      {showRipples.map(ripple => (
        <div 
          key={ripple.id}
          className="absolute rounded-full border border-white/30 pointer-events-none animate-ripple"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40
          }}
        />
      ))}

      {/* Audio Toggle */}
      <button 
        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white backdrop-blur-md"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Main Christmas Tree */}
      <div className="absolute left-1/2 bottom-[15%] -translate-x-1/2 flex flex-col items-center z-20 transition-all duration-1000 transform hover:scale-105">
        <div 
          className="relative cursor-pointer"
          onClick={(e) => { e.stopPropagation(); setIsTreeLit(!isTreeLit); playSound(1000, 'triangle', 0.3); }}
        >
          {/* Top Star */}
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-500 ${isTreeLit ? 'text-yellow-400 scale-125 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]' : 'text-yellow-900'}`}>
            <Stars size={48} className={isTreeLit ? 'animate-pulse' : ''} />
          </div>

          {/* Tree Body */}
          <div className="flex flex-col items-center">
            {[1, 2, 3].map((layer) => (
              <div 
                key={layer}
                className="relative -mt-8"
                style={{ 
                  width: `${layer * 120}px`, 
                  height: `${layer * 80}px`,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: `linear-gradient(to bottom, ${isTreeLit ? '#15803d' : '#064e3b'}, #052e16)`,
                  boxShadow: isTreeLit ? '0 0 30px rgba(21, 128, 61, 0.4)' : 'none',
                  zIndex: 4 - layer
                }}
              >
                {/* Decorative Lights */}
                {isTreeLit && Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-pulse"
                    style={{
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#facc15'][Math.floor(Math.random() * 4)],
                      boxShadow: '0 0 10px currentColor'
                    }}
                  />
                ))}
              </div>
            ))}
            {/* Trunk */}
            <div className="w-12 h-16 bg-[#451a03] -mt-1 rounded-b-md" />
          </div>
        </div>

        {/* Personalized AI Wish Message */}
        {aiWish && (
          <div className="mt-8 text-center px-4 max-w-lg animate-float">
            <h2 className="text-4xl md:text-5xl font-pacifico text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight">
              {aiWish}
            </h2>
          </div>
        )}
      </div>

      {/* Placed DIY Items */}
      {items.map(item => (
        <div
          key={item.id}
          className="absolute z-20 cursor-move group transition-transform hover:scale-110"
          style={{ 
            left: item.x, 
            top: item.y, 
            transform: `translate(-50%, -50%) scale(${item.scale})`,
          }}
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startY = e.clientY;
            const itemX = item.x;
            const itemY = item.y;
            const move = (moveEvent: MouseEvent) => {
              setItems(prev => prev.map(i => i.id === item.id ? {
                ...i,
                x: itemX + (moveEvent.clientX - startX),
                y: itemY + (moveEvent.clientY - startY)
              } : i));
            };
            const up = () => {
              window.removeEventListener('mousemove', move);
              window.removeEventListener('mouseup', up);
            };
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', up);
          }}
        >
          {item.type === 'snowman' && (
             <div className="text-5xl drop-shadow-lg">⛄</div>
          )}
          {item.type === 'gift' && (
             <div className="text-5xl drop-shadow-lg">🎁</div>
          )}
          {item.type === 'star' && (
             <div className="text-5xl drop-shadow-lg">⭐</div>
          )}
          {item.type === 'reindeer' && (
             <div className="text-5xl drop-shadow-lg">🦌</div>
          )}
          <button 
            className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 transition-opacity"
            onClick={(e) => { e.stopPropagation(); setItems(prev => prev.filter(i => i.id !== item.id)); }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}

      {/* UI Panels */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center md:items-start gap-4 z-40">
        <div className="glass-card p-2 rounded-2xl flex gap-1">
          <button 
            onClick={() => setActiveTab('diy')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'diy' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
          >
            Design
          </button>
          <button 
            onClick={() => setActiveTab('wish')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'wish' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
          >
            Magic Wish
          </button>
        </div>

        {activeTab === 'diy' ? (
          <div className="glass-card p-4 rounded-3xl flex items-center gap-4 animate-slide-up">
            <button onClick={() => addItem('snowman')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all hover:-translate-y-1">
              <span className="text-3xl">⛄</span>
            </button>
            <button onClick={() => addItem('gift')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all hover:-translate-y-1">
              <span className="text-3xl">🎁</span>
            </button>
            <button onClick={() => addItem('star')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all hover:-translate-y-1">
              <span className="text-3xl">⭐</span>
            </button>
            <button onClick={() => addItem('reindeer')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all hover:-translate-y-1">
              <span className="text-3xl">🦌</span>
            </button>
            <div className="w-px h-10 bg-white/20 mx-2" />
            <button onClick={clearAll} className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-2xl transition-all">
              <Trash size={24} />
            </button>
          </div>
        ) : (
          <div className="glass-card p-4 rounded-3xl flex items-center gap-3 animate-slide-up w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Enter your name..." 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-transparent border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 outline-none focus:border-white/50 transition-all flex-1"
            />
            <button 
              onClick={handleGenerateWish}
              disabled={isGenerating || !userName.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all font-bold"
            >
              {isGenerating ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/50 border-t-white" /> : <Send size={18} />}
              Generate
            </button>
          </div>
        )}
      </div>

      {/* Decorative Overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Initial Instructions */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-50 z-0">
        <h1 className="text-2xl text-white/40 font-pacifico tracking-widest uppercase">
          Happy Holidays
        </h1>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        .animate-float { animation: float 4s infinite ease-in-out; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-ripple { animation: ripple 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
