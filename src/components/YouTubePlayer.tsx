import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface YouTubePlayerProps {
  videoId?: string;
  songTitle?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId = 'tgVYh94QH8k',
  songTitle = 'Taylor Swift - Lover (Official Vocals) 🎤',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!iframeRef.current) return;

    const command = isPlaying ? 'pauseVideo' : 'playVideo';
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Background YouTube Audio Frame (Official Song with Taylor Swift Vocals) */}
      <iframe
        ref={iframeRef}
        id="yt-music-player"
        width="1"
        height="1"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${videoId}`}
        allow="autoplay; encrypted-media"
        title="Taylor Swift - Lover Official Vocals"
        style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Floating Audio Pill */}
      <div
        className="music-player-pill"
        onClick={togglePlay}
        title={isPlaying ? "Pause Music" : "Play Taylor Swift - Lover (Official Vocals)"}
        style={{
          position: 'fixed',
          top: '1.2rem',
          right: '1.2rem',
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(14px)',
          border: '2px solid #ffccd5',
          borderRadius: '50px',
          padding: '6px 14px 6px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 6px 20px rgba(255, 77, 109, 0.22)',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: isPlaying ? 'linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%)' : '#f1faee',
            color: isPlaying ? '#ffffff' : '#6c757d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isPlaying ? '0 4px 12px rgba(255, 77, 109, 0.4)' : 'none',
            transition: 'all 0.25s ease',
          }}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', fontWeight: 700 }}>
            {isPlaying ? '♪ Playing Official Vocals' : 'Tap to Play Official Song'}
          </span>
          <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--primary-rose)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Music size={12} />
            {songTitle}
          </span>
        </div>
      </div>
    </>
  );
};
