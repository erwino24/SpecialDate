import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Smile, PartyPopper, ArrowRight } from 'lucide-react';

interface ProposalStepProps {
  onAccept: () => void;
}

const TEASING_MESSAGES = [
  "Wrong button! 💖",
  "Try again! 😜",
  "You can't escape this date! 💘",
  "Nice try! 🥰",
  "Yes is right over here! 👉",
  "Are you sure? 🥺",
  "Think again! 💕",
  "No is not an option! 💖",
];

export const ProposalStep: React.FC<ProposalStepProps> = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentTease, setCurrentTease] = useState<string | null>(null);
  const [showYesModal, setShowYesModal] = useState(false);

  const moveNoButton = () => {
    setNoCount((prev) => prev + 1);

    const randomMsg = TEASING_MESSAGES[Math.floor(Math.random() * TEASING_MESSAGES.length)];
    setCurrentTease(randomMsg);

    // Keep offset within visible card bounds
    const newX = (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 80);
    const newY = (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 60);

    setNoPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb703', '#ffffff'],
    });
    setShowYesModal(true);
  };

  // Capped scale so button never overlaps card boundaries
  const yesScale = Math.min(1 + noCount * 0.08, 1.25);

  return (
    <div className="glass-card animate-fade-in" style={{ position: 'relative' }}>
      <div className="heart-badge">
        <Sparkles size={16} />
        <span>Special Date Proposal</span>
        <Heart size={16} fill="currentColor" />
      </div>

      <img
        src="/images/hero.png"
        alt="Special Couple Date"
        className="proposal-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80";
        }}
      />

      <h1 className="proposal-title font-playful">
        Will you go on a date with me? 💖
      </h1>

      <p className="proposal-subtitle">
        I prepared something super special just for us! Will you make my day and say yes? 🥰
      </p>

      <div className="proposal-buttons" style={{ flexWrap: 'wrap', minHeight: '100px' }}>
        {currentTease && (
          <div className="tease-toast">
            {currentTease}
          </div>
        )}

        {/* Big YES Button */}
        <button
          className="btn-yes font-playful"
          style={{ transform: `scale(${yesScale})`, maxWidth: '100%' }}
          onClick={handleYesClick}
        >
          <Heart size={24} fill="#ffffff" />
          <span>YES, OF COURSE! 💖</span>
        </button>

        {/* Escaping NO Button */}
        <button
          className="btn-no"
          style={
            noPosition
              ? {
                  position: 'relative',
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  transition: 'transform 0.15s ease-out',
                }
              : { transition: 'transform 0.15s ease-out' }
          }
          onMouseEnter={moveNoButton}
          onMouseMove={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={() => {
            moveNoButton();
            setTimeout(() => {
              handleYesClick();
            }, 250);
          }}
        >
          <Smile size={18} style={{ marginRight: '6px' }} />
          <span>{noCount === 0 ? "No" : "Are you sure? 🥺"}</span>
        </button>
      </div>

      {/* YES Celebration Modal Popup */}
      {showYesModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(12px)',
            borderRadius: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            zIndex: 50,
            animation: 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className="heart-badge" style={{ background: '#fff0f3' }}>
            <PartyPopper size={20} color="var(--primary-rose)" />
            <span>YAAAY! BEST RESPONSE EVER!</span>
          </div>

          <h2 className="proposal-title font-playful" style={{ fontSize: '2.2rem', marginTop: '0.5rem' }}>
            YOU SAID YES! 🎉💖
          </h2>

          <p className="proposal-subtitle" style={{ fontSize: '1.15rem', maxWidth: '440px', margin: '0.8rem 0 1.8rem 0' }}>
            You just made my day so special! 🥰 Now let's plan our date together—pick your favorite food, activities, and time on the calendar!
          </p>

          <button
            className="btn-primary font-playful"
            style={{ fontSize: '1.2rem', padding: '1rem 2.2rem' }}
            onClick={onAccept}
          >
            <span>Let's Customize Our Date! 🚀</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
