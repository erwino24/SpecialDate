import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Copy, RefreshCw, Check, Sparkles, MessageCircle, Camera } from 'lucide-react';
import { FOOD_OPTIONS } from './FoodStep';
import { ACTIVITY_OPTIONS } from './ActivityStep';

interface TicketStepProps {
  selectedFoods: string[];
  selectedActivities: string[];
  date: string;
  timeSlot: string;
  pickupPreference: string;
  outfitMood: string;
  customNote: string;
  onReset: () => void;
}

export const TicketStep: React.FC<TicketStepProps> = ({
  selectedFoods,
  selectedActivities,
  date,
  timeSlot,
  pickupPreference,
  outfitMood,
  customNote,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedMessenger, setCopiedMessenger] = useState(false);

  useEffect(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c6', '#ffb703', '#ffffff'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const foodTitles = selectedFoods
    .map((id) => FOOD_OPTIONS.find((f) => f.id === id)?.title)
    .filter(Boolean)
    .join(', ');

  const activityTitles = selectedActivities
    .map((id) => ACTIVITY_OPTIONS.find((a) => a.id === id)?.title)
    .filter(Boolean)
    .join(', ');

  const formatDateString = (dateStr: string) => {
    if (!dateStr) return 'To be confirmed';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const d = new Date(year, month, day);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formattedDate = formatDateString(date);

  const summaryText = `Yay! I accepted your date invite! 💕

📅 Date: ${formattedDate}
⏰ Time: ${timeSlot}
🍜 Food: ${foodTitles || 'Surprise me'}
🎬 Activity: ${activityTitles || 'Surprise me'}
🚗 Meeting: ${pickupPreference === 'pickup' ? 'Pick me up at home' : 'Meet at venue'}
👗 Vibe: ${outfitMood}
${customNote ? `💬 Notes: "${customNote}"` : ''}

Created with 💖 by Wino
I can't wait for our date! 🥰💖`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMessengerShare = () => {
    navigator.clipboard.writeText(summaryText);
    setCopiedMessenger(true);
    setTimeout(() => setCopiedMessenger(false), 3000);
    window.open('https://m.me', '_blank');
  };

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(summaryText);
    setCopiedMessenger(true);
    setTimeout(() => setCopiedMessenger(false), 3000);
    window.open('https://instagram.com/direct/inbox/', '_blank');
  };

  return (
    <div className="glass-card">
      <div className="heart-badge">
        <Sparkles size={16} />
        <span>Special Date Confirmed!</span>
        <Heart size={16} fill="currentColor" />
      </div>

      <h2 className="proposal-title font-playful" style={{ fontSize: '2.1rem' }}>
        IT'S A DATE! 🎉💖
      </h2>
      <p className="proposal-subtitle" style={{ marginBottom: '1.2rem' }}>
        Here is our official special date pass ticket!
      </p>

      {/* Date Pass Ticket Card */}
      <div className="ticket-wrapper">
        <div className="ticket-header">
          <div>
            <div className="ticket-id">PASS #SPECIAL-2026-DATE</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-rose)' }} className="font-playful">
              Special Date Pass
            </div>
          </div>
          <Heart size={36} color="var(--primary-rose)" fill="var(--rose-glow)" />
        </div>

        <div className="ticket-item">
          <div className="ticket-label">Date & Time</div>
          <div className="ticket-val">
            📅 {formattedDate} at {timeSlot}
          </div>
        </div>

        <div className="ticket-item">
          <div className="ticket-label">Food & Treats</div>
          <div className="ticket-tags">
            {selectedFoods.map((id) => {
              const item = FOOD_OPTIONS.find((f) => f.id === id);
              return (
                <span key={id} className="ticket-tag">
                  {item?.title || id}
                </span>
              );
            })}
          </div>
        </div>

        <div className="ticket-item">
          <div className="ticket-label">Date Activities</div>
          <div className="ticket-tags">
            {selectedActivities.map((id) => {
              const item = ACTIVITY_OPTIONS.find((a) => a.id === id);
              return (
                <span key={id} className="ticket-tag">
                  {item?.title || id}
                </span>
              );
            })}
          </div>
        </div>

        <div className="ticket-item">
          <div className="ticket-label">Pick-up & Outfit Vibe</div>
          <div className="ticket-val" style={{ fontSize: '0.95rem' }}>
            {pickupPreference === 'pickup' ? '🚗 Picking up at home' : '📍 Meeting at venue'} • Vibe: {outfitMood}
          </div>
        </div>

        {customNote && (
          <div className="ticket-item" style={{ marginBottom: 0 }}>
            <div className="ticket-label">Special Note</div>
            <div className="ticket-val" style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
              "{customNote}"
            </div>
          </div>
        )}

        {/* Ticket Footer Credit */}
        <div style={{ marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px dashed #ffccd5', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Created with 💖 by <span style={{ color: 'var(--primary-rose)', fontWeight: 800 }}>Wino</span>
        </div>
      </div>

      {copiedMessenger && (
        <div className="tease-toast" style={{ background: '#25d366', color: '#fff', top: '-1rem' }}>
          Itinerary copied! Paste into Messenger / IG chat! 💬
        </div>
      )}

      {/* Action Buttons for Messenger & IG */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.2rem' }}>
        <button 
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: '0.9rem', background: 'linear-gradient(135deg, #0084ff 0%, #00c6ff 100%)' }}
          onClick={handleMessengerShare}
        >
          <MessageCircle size={20} />
          <span>Send Itinerary via Messenger 💬</span>
        </button>

        <button 
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: '0.9rem', background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)' }}
          onClick={handleInstagramShare}
        >
          <Camera size={20} />
          <span>Send Itinerary via Instagram (IG) 📸</span>
        </button>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button 
            className="btn-secondary" 
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={handleCopy}
          >
            {copied ? <Check size={18} color="green" /> : <Copy size={18} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Itinerary'}</span>
          </button>

          <button 
            className="btn-secondary" 
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={onReset}
          >
            <RefreshCw size={18} />
            <span>Edit Choices</span>
          </button>
        </div>
      </div>
    </div>
  );
};
