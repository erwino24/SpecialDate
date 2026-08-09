import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

interface CalendarStepProps {
  date: string;
  setDate: (date: string) => void;
  timeSlot: string;
  setTimeSlot: (time: string) => void;
  pickupPreference: string;
  setPickupPreference: (pref: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const TIME_SLOTS = [
  { id: '12:00 PM', label: '12:00 PM ☀️ (Lunch Date)' },
  { id: '3:00 PM', label: '3:00 PM ☕ (Afternoon Cafe)' },
  { id: '6:30 PM', label: '6:30 PM 🌙 (Special Dinner)' },
  { id: '8:30 PM', label: '8:30 PM 🌌 (Night Cinema/Chill)' },
];

export const CalendarStep: React.FC<CalendarStepProps> = ({
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  pickupPreference,
  setPickupPreference,
  onNext,
  onBack,
}) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="glass-card">
      <div className="heart-badge">
        <Calendar size={16} />
        <span>Step 3: Date & Time</span>
      </div>

      <h2 className="proposal-title font-playful" style={{ fontSize: '1.8rem' }}>
        When are you free for our date? 📅
      </h2>
      <p className="proposal-subtitle" style={{ marginBottom: '1rem' }}>
        Pick a date on the calendar & time that works best for you! 💖
      </p>

      {/* Date Picker Input */}
      <div className="calendar-box">
        <label className="ticket-label" style={{ display: 'block', marginBottom: '8px', textAlign: 'center' }}>
          Select Date on Calendar:
        </label>
        <input
          type="date"
          className="date-input font-playful"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Time Slot Picker */}
      <div style={{ marginTop: '1.2rem', textAlign: 'left' }}>
        <label className="ticket-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Clock size={16} />
          <span>Preferred Time:</span>
        </label>
        <div className="time-slots">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.id}
              className={`time-btn ${timeSlot === slot.id ? 'selected' : ''}`}
              onClick={() => setTimeSlot(slot.id)}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pick-up Option */}
      <div style={{ marginTop: '1.2rem', textAlign: 'left' }}>
        <label className="ticket-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <MapPin size={16} />
          <span>How should we meet?</span>
        </label>
        <div className="time-slots">
          <button
            className={`time-btn ${pickupPreference === 'pickup' ? 'selected' : ''}`}
            onClick={() => setPickupPreference('pickup')}
          >
            🚗 Pick me up at home
          </button>
          <button
            className={`time-btn ${pickupPreference === 'meet' ? 'selected' : ''}`}
            onClick={() => setPickupPreference('meet')}
          >
            📍 Let's meet at venue
          </button>
        </div>
      </div>

      <div className="nav-controls">
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!date || !timeSlot}
        >
          <span>Next: Special Notes</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
