import { useState, useRef } from 'react';
import { Background } from './components/Background';
import { ProposalStep } from './components/ProposalStep';
import { FoodStep } from './components/FoodStep';
import { ActivityStep } from './components/ActivityStep';
import { CalendarStep } from './components/CalendarStep';
import { NotesStep } from './components/NotesStep';
import { TicketStep } from './components/TicketStep';

export function App() {
  const [step, setStep] = useState(0);

  // Date Selections State
  const [selectedFoods, setSelectedFoods] = useState<string[]>(['ramen', 'coffee']);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['cinema']);
  const [date, setDate] = useState<string>(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 3);
    return nextWeek.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('6:30 PM');
  const [pickupPreference, setPickupPreference] = useState<string>('pickup');
  const [outfitMood, setOutfitMood] = useState<string>('💖 Matchy Couple Outfits');
  const [customNote, setCustomNote] = useState<string>('');

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      // Gentle romantic melody URL or Web Audio synth fallback
      audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((err) => console.log('Audio autoplay prevented:', err));
    }
  };

  const handleToggleFood = (id: string) => {
    setSelectedFoods((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <main className="app-container">
      {/* Background Hearts & Audio Control */}
      <Background isPlaying={isPlaying} onToggleAudio={toggleAudio} />

      {/* Step Progress Dots (for steps 1-4) */}
      {step > 0 && step < 5 && (
        <div className="step-indicator">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`step-dot ${step === i ? 'active' : step > i ? 'completed' : ''}`}
            />
          ))}
        </div>
      )}

      {/* Step Components */}
      {step === 0 && <ProposalStep onAccept={() => setStep(1)} />}

      {step === 1 && (
        <FoodStep
          selectedFoods={selectedFoods}
          onToggleFood={handleToggleFood}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <ActivityStep
          selectedActivities={selectedActivities}
          onToggleActivity={handleToggleActivity}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <CalendarStep
          date={date}
          setDate={setDate}
          timeSlot={timeSlot}
          setTimeSlot={setTimeSlot}
          pickupPreference={pickupPreference}
          setPickupPreference={setPickupPreference}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <NotesStep
          outfitMood={outfitMood}
          setOutfitMood={setOutfitMood}
          customNote={customNote}
          setCustomNote={setCustomNote}
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
        />
      )}

      {step === 5 && (
        <TicketStep
          selectedFoods={selectedFoods}
          selectedActivities={selectedActivities}
          date={date}
          timeSlot={timeSlot}
          pickupPreference={pickupPreference}
          outfitMood={outfitMood}
          customNote={customNote}
          onReset={() => setStep(1)}
        />
      )}
    </main>
  );
}

export default App;
