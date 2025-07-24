import React from 'react';

export default function MoneyBar({ money, handleDeposit }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Money: ${money}</span>
      <button
        className='add-btn'
        onClick={handleDeposit}
      >
        Deposit $100
      </button>
    </div>
  );
}