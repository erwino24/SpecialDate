import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Heart, Music } from 'lucide-react';

interface BackgroundProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
  songTitle?: string;
}

export const Background: React.FC<BackgroundProps> = ({ 
  isPlaying, 
  onToggleAudio, 
  songTitle = "Taylor Swift - Lover 🎵" 
}) => {
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

      {/* Floating Music Player Pill */}
      <div 
        className="music-player-pill"
        onClick={onToggleAudio}
        title={isPlaying ? "Pause Music" : "Play Taylor Swift - Lover"}
        style={{
          position: 'fixed',
          top: '1.2rem',
          right: '1.2rem',
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid #ffccd5',
          borderRadius: '50px',
          padding: '6px 14px 6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 18px rgba(255, 77, 109, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: isPlaying ? 'var(--primary-rose)' : '#e9ecef',
            color: isPlaying ? '#ffffff' : '#6c757d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease',
          }}
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </div>

        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 700 }}>
            {isPlaying ? '♪ Playing Music' : 'Tap to Play Music'}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-rose)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Music size={12} />
            {songTitle}
          </span>
        </div>
      </div>
    </>
  );
};
