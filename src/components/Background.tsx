import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { YouTubePlayer } from './YouTubePlayer';

export const Background: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
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

      {/* Official YouTube Music Player for Taylor Swift - Lover (Vocals tgVYh94QH8k) */}
      <YouTubePlayer videoId="tgVYh94QH8k" songTitle="Taylor Swift - Lover (Official Vocals) 🎤" />
    </>
  );
};
