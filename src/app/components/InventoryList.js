import React from 'react';

export default function InventoryList({ inventory, handleAdd }) {
  return (
    <div className="area">
      <h2>Inventory :</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.art_id}>
            {item.name} (ID: {item.art_id}) - Stock: {item.stock}
            <button className="add-btn" onClick={() => handleAdd(item.art_id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}