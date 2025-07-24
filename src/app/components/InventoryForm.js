import React from 'react';

export default function InventoryForm({ form, handleFormChange, handleFormSubmit, isFormValid }) {
  return (
    <div className="area">
      <h2>Add New Item</h2>
      <form onSubmit={handleFormSubmit} style={{ marginTop: '32px' }}>
        <input
          type="text"
          name="art_id"
          placeholder="ID"
          value={form.art_id}
          onChange={handleFormChange}
          style={{ marginRight: '8px' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleFormChange}
          style={{ marginRight: '8px' }}
        />
        <input
          type="number"
          name="stock"
          placeholder="Number"
          value={form.stock}
          onChange={handleFormChange}
          style={{ marginRight: '8px' }}
        />
        <button className='add-btn' type="submit" disabled={!isFormValid}>Add</button>
      </form>
    </div>
  );
}