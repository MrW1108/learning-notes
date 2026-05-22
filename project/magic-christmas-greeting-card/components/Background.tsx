
import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] overflow-hidden">
      {/* Distant Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="star absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Snow Mountains */}
      <svg className="absolute bottom-0 w-full h-64 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="rgba(255, 255, 255, 0.05)"
          d="M0,256L80,224C160,192,320,128,480,122.7C640,117,800,171,960,181.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
        <path
          fill="rgba(255, 255, 255, 0.1)"
          d="M0,288L120,256C240,224,480,160,720,170.7C960,181,1200,267,1320,309.3L1440,352L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        />
      </svg>
    </div>
  );
};
