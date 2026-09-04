import React from 'react';

export default function GiftOfVoiceLogo({ size = 42, className = '' }) {
  return (
    <div 
      className={`gov-brand-logo ${className}`}
      style={{ 
        width: size, 
        height: size, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        background: 'rgba(6, 182, 212, 0.08)',
        border: '1px solid rgba(34, 211, 238, 0.25)',
        boxShadow: '0 0 14px rgba(6, 182, 212, 0.25)',
      }}
      aria-label="GiftOfVoice Logo"
    >
      <img
        src="/logo.png"
        alt="GiftOfVoice Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}
