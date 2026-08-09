import React from 'react';
import { Utensils, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export interface FoodOption {
  id: string;
  title: string;
  emoji: string;
  image?: string;
  desc: string;
}

export const FOOD_OPTIONS: FoodOption[] = [
  { id: 'ramen', title: 'Hot Ramen 🍜', emoji: '🍜', image: '/images/ramen.png', desc: 'Warm broth & noodles' },
  { id: 'coffee', title: 'Coffee & Cafe ☕', emoji: '☕', image: '/images/coffee.png', desc: 'Lattes & sweet cakes' },
  { id: 'sushi', title: 'Sushi & Japanese 🍣', emoji: '🍣', desc: 'Fresh rolls, salmon & tempura' },
  { id: 'hotpot', title: 'Hotpot / Shabu 🍲', emoji: '🍲', desc: 'Savory broth & beef slices' },
  { id: 'samgyupsal', title: 'Samgyupsal 🥩', emoji: '🥩', desc: 'K-BBQ & unlimited meat' },
  { id: 'mexican', title: 'Tacos & Mexican 🌮', emoji: '🌮', desc: 'Quesadillas, tacos & chips' },
  { id: 'milktea', title: 'Milk Tea 🧋', emoji: '🧋', desc: 'Sweet boba & pearls' },
  { id: 'streetfood', title: 'Pinoy Street Food 🍢', emoji: '🍢', desc: 'Isaw, kwek-kwek & sauce' },
  { id: 'pizza', title: 'Pizza & Pasta 🍕', emoji: '🍕', desc: 'Cheesy pizza & pasta' },
  { id: 'fastfood', title: 'Jollibee / McDo / KFC 🍗', emoji: '🍗', desc: 'Crispy chicken & burgers' },
  { id: 'icecream', title: 'Gelato / Ice Cream 🍦', emoji: '🍦', desc: 'Sweet cold treats' },
];

interface FoodStepProps {
  selectedFoods: string[];
  onToggleFood: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FoodStep: React.FC<FoodStepProps> = ({ selectedFoods, onToggleFood, onNext, onBack }) => {
  return (
    <div className="glass-card">
      <div className="heart-badge">
        <Utensils size={16} />
        <span>Step 1: Food & Treats</span>
      </div>

      <h2 className="proposal-title font-playful" style={{ fontSize: '1.8rem' }}>
        What food are you craving? 🤤
      </h2>
      <p className="proposal-subtitle" style={{ marginBottom: '1rem' }}>
        Pick as many as you want! I want to treat you to your favorites 💖
      </p>

      <div className="cards-grid">
        {FOOD_OPTIONS.map((item) => {
          const isSelected = selectedFoods.includes(item.id);
          return (
            <div
              key={item.id}
              className={`select-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggleFood(item.id)}
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
          disabled={selectedFoods.length === 0}
        >
          <span>Next: Pick Activities</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
