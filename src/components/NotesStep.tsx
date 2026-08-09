import React from 'react';
import { MessageSquareHeart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface NotesStepProps {
  outfitMood: string;
  setOutfitMood: (mood: string) => void;
  customNote: string;
  setCustomNote: (note: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const OUTFIT_OPTIONS = [
  { id: 'casual', label: '☕ Cozy Casual Vibes' },
  { id: 'matchy', label: '💖 Matchy Couple Outfits' },
  { id: 'dressup', label: '💃 Dress Up & Aesthetic' },
  { id: 'comfy', label: '👟 Comfy Streetwear' },
];

export const NotesStep: React.FC<NotesStepProps> = ({
  outfitMood,
  setOutfitMood,
  customNote,
  setCustomNote,
  onNext,
  onBack,
}) => {
  return (
    <div className="glass-card">
      <div className="heart-badge">
        <MessageSquareHeart size={16} />
        <span>Step 4: Outfit Vibe & Special Notes</span>
      </div>

      <h2 className="proposal-title font-playful" style={{ fontSize: '1.8rem' }}>
        Almost ready! 💕
      </h2>
      <p className="proposal-subtitle" style={{ marginBottom: '1rem' }}>
        What outfit vibe are we going for and any special requests? ✨
      </p>

      {/* Outfit Vibe Selection */}
      <div style={{ textAlign: 'left', marginBottom: '1.2rem' }}>
        <label className="ticket-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Sparkles size={16} />
          <span>Dress Code & Outfit Vibe:</span>
        </label>
        <div className="time-slots">
          {OUTFIT_OPTIONS.map((item) => (
            <button
              key={item.id}
              className={`time-btn ${outfitMood === item.id ? 'selected' : ''}`}
              onClick={() => setOutfitMood(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Note Textarea */}
      <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <label className="ticket-label" style={{ display: 'block', marginBottom: '8px' }}>
          Any special cravings, favorite snacks or notes for me? 🥰
        </label>
        <textarea
          rows={3}
          style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: '14px',
            border: '2px solid #ffccd5',
            fontSize: '0.95rem',
            outline: 'none',
            resize: 'none',
            fontFamily: 'Outfit, sans-serif',
          }}
          placeholder="E.g., I want extra matcha boba, extra garlic butter ramen, or buy me flowers! 🌸"
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
        />
      </div>

      <div className="nav-controls">
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <button className="btn-primary" onClick={onNext}>
          <span>Generate Date Pass 🎟️</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
