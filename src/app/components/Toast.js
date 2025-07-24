import React from 'react';

export default function Toast({ showToast }) {
  if (!showToast) return null;
  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      background: '#fff',
      color: '#333',
      borderRadius: '8px',
      padding: '12px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      Added!
    </div>
  );
}