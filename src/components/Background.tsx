import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Heart } from 'lucide-react';

interface BackgroundProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
}

export const Background: React.FC<BackgroundProps> = ({ isPlaying, onToggleAudio }) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random floating hearts
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 24 + 14,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 5,
    }));
    setParticles(items);
  }, []);

  return (
    <>
      {/* Background Floating Hearts */}
      <div className="ambient-bg" aria-hidden="true">
        {particles.map((p) => (
          <Heart
            key={p.id}
            className="heart-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Music / Audio Toggle Button */}
      <button 
        className="audio-toggle" 
        onClick={onToggleAudio}
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        aria-label="Toggle background music"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </>
  );
};
