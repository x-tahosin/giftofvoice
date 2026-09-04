import React from 'react';
import { getAssetUrl } from '../utils/assets.js';

export default function GiftOfVoiceLogo({ size = 42, className = '' }) {
  const logoSrc = getAssetUrl('logo.png');

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
        src={logoSrc}
        alt="GiftOfVoice Logo"
        onError={(e) => {
          if (!e.target.dataset.triedFallback) {
            e.target.dataset.triedFallback = 'true';
            const cleanPath = window.location.pathname.endsWith('/') 
              ? window.location.pathname 
              : `${window.location.pathname}/`;
            e.target.src = `${window.location.origin}${cleanPath}logo.png`;
          }
        }}
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
