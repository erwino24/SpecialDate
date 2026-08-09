import React from 'react';
import { Film, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export interface ActivityOption {
  id: string;
  title: string;
  emoji: string;
  image?: string;
  desc: string;
}

export const ACTIVITY_OPTIONS: ActivityOption[] = [
  { id: 'cinema', title: 'Cinema & Movie 🎬', emoji: '🎬', image: '/images/cinema.png', desc: 'Popcorn & movie date' },
  { id: 'arcade', title: 'Arcade & Bowling 🕹️', emoji: '🕹️', desc: 'Fun games & ticket prizes' },
  { id: 'sunset', title: 'Sunset Stroll 🌅', emoji: '🌅', desc: 'Special park walk' },
  { id: 'karaoke', title: 'Karaoke / KTV 🎤', emoji: '🎤', desc: 'Singing our favorite songs' },
  { id: 'shopping', title: 'Mall & Shopping 🛍️', emoji: '🛍️', desc: 'Window shopping stroll' },
  { id: 'museum', title: 'Art Museum 🎨', emoji: '🎨', desc: 'Aesthetic photos & gallery' },
];

interface ActivityStepProps {
  selectedActivities: string[];
  onToggleActivity: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ActivityStep: React.FC<ActivityStepProps> = ({
  selectedActivities,
  onToggleActivity,
  onNext,
  onBack,
}) => {
  return (
    <div className="glass-card">
      <div className="heart-badge">
        <Film size={16} />
        <span>Step 2: Date Activities</span>
      </div>

      <h2 className="proposal-title font-playful" style={{ fontSize: '1.8rem' }}>
        What do you want us to do together? ✨
      </h2>
      <p className="proposal-subtitle" style={{ marginBottom: '1rem' }}>
        Choose one or more date ideas! Let's make special memories 💖
      </p>

      <div className="cards-grid">
        {ACTIVITY_OPTIONS.map((item) => {
          const isSelected = selectedActivities.includes(item.id);
          return (
            <div
              key={item.id}
              className={`select-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggleActivity(item.id)}
            >
              {isSelected && (
                <div className="card-badge">
                  <Check size={14} />
                </div>
              )}
              {item.image ? (
                <img src={item.image} alt={item.title} className="card-img" />
              ) : (
                <div className="card-emoji">{item.emoji}</div>
              )}
              <div className="card-title">{item.title}</div>
              <div className="card-desc">{item.desc}</div>
            </div>
          );
        })}
      </div>

      <div className="nav-controls">
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={selectedActivities.length === 0}
        >
          <span>Next: Choose Date & Time</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
