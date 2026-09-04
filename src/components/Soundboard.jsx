import React, { useState } from 'react';
import {
  SOUNDBOARD_CATEGORIES,
  SOUNDBOARD_ITEMS,
} from '../data/soundboardItems';
import {
  HeartHandshake,
  CupSoda,
  Heart,
  Smile,
  AlertCircle,
  Volume2,
  Check,
  Sparkles,
  Sun,
  ThumbsUp,
  Flame,
  Bed,
  MoveUp,
  Moon,
  Award,
  Users,
  Hand,
  MessageCircle,
  Laugh,
  Eye,
  ShieldCheck,
  Pill,
  Wind,
  ShieldAlert,
  PhoneCall,
} from 'lucide-react';

const ICON_MAP = {
  HeartHandshake,
  CupSoda,
  Heart,
  Smile,
  AlertCircle,
  Sparkles,
  Sun,
  ThumbsUp,
  Flame,
  Bed,
  MoveUp,
  Moon,
  Award,
  Users,
  Hand,
  MessageCircle,
  Laugh,
  Eye,
  ShieldCheck,
  Pill,
  Wind,
  ShieldAlert,
  PhoneCall,
};

export default function Soundboard({
  selectedItems,
  onToggleItem,
  onQuickSpeak,
  onClearItems,
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? SOUNDBOARD_ITEMS
    : SOUNDBOARD_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="glass-card">
      {/* Header & Category Tabs */}
      <div className="gov-panel-header">
        <div>
          <h2 className="gov-panel-title">
            <span className="gov-dot-indicator gov-dot-indigo" />
            1. Empathy Soundboard (Accessible AAC Interface)
          </h2>
          <p className="gov-panel-desc">
            Tap concepts to compose your thoughts. Designed with accessible high-contrast touch targets.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="gov-category-tabs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`gov-cat-tab ${activeCategory === 'all' ? 'active' : ''}`}
          >
            All Concepts ({SOUNDBOARD_ITEMS.length})
          </button>
          {SOUNDBOARD_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Heart;
            const count = SOUNDBOARD_ITEMS.filter((i) => i.category === cat.id).length;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`gov-cat-tab ${isSelected ? 'active' : ''}`}
              >
                <IconComponent size={14} />
                <span>{cat.label}</span>
                <span style={{ opacity: 0.6, fontSize: '10px' }}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Soundboard Tiles */}
      <div className="gov-tiles-grid" role="region" aria-label="AAC Soundboard Tiles">
        {filteredItems.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Heart;
          const isSelected = selectedItems.some((i) => i.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => onToggleItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleItem(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              className={`gov-tile ${isSelected ? 'selected' : ''}`}
            >
              {/* Checkmark */}
              {isSelected && (
                <span className="gov-tile-check">
                  <Check size={12} />
                </span>
              )}

              {/* Tile Icon */}
              <div className="gov-tile-icon-box">
                <IconComponent size={20} />
              </div>

              {/* Label */}
              <span className="gov-tile-label">
                {item.label}
              </span>

              {/* Quick Pronounce Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickSpeak(item.label);
                }}
                className="gov-tile-quick-speak"
                title={`Quick speak: "${item.label}"`}
                aria-label={`Quick speak ${item.label}`}
              >
                <Volume2 size={13} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Items Tray */}
      {selectedItems.length > 0 && (
        <div className="gov-tray">
          <div className="gov-tray-items">
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--indigo-light)', marginRight: '4px' }}>
              Selected Concepts ({selectedItems.length}):
            </span>
            {selectedItems.map((item) => (
              <span key={item.id} className="gov-tray-pill">
                {item.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItem(item);
                  }}
                  aria-label={`Remove ${item.label}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={onClearItems}
            style={{ fontSize: '0.78rem', color: 'var(--rose-light)', textDecoration: 'underline', fontWeight: 600 }}
          >
            Clear All Selection
          </button>
        </div>
      )}
    </section>
  );
}
