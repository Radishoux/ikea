"use client";
import { useState, useEffect } from 'react';
import inventoryData from './inventory.json';


export default function Home() {
  const [inventory, setInventory] = useState(inventoryData.inventory);
  const [form, setForm] = useState({ name: '', art_id: '', stock: '' });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (form.art_id.trim()) {
      const found = inventory.find(item => item.art_id === form.art_id.trim());
      if (found) {
        setForm(prev => ({ ...prev, name: found.name }));
      }
    }
  }, [form.art_id, inventory]);

  const handleAdd = (art_id) => {
    setInventory(prev =>
      prev.map(item =>
        item.art_id === art_id
          ? { ...item, stock: String(Number(item.stock) + 1) }
          : item
      )
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = form.name.trim() && form.art_id.trim() && form.stock.trim() && !isNaN(Number(form.stock));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setInventory(prev => {
      const existing = prev.find(item => item.art_id === form.art_id);
      if (existing) {
        return prev.map(item =>
          item.art_id === form.art_id
            ? { ...item, stock: String(Number(item.stock) + Number(form.stock)) }
            : item
        );
      } else {
        return [...prev, { name: form.name, art_id: form.art_id, stock: form.stock }];
      }
    });

    setForm({ name: '', art_id: '', stock: '' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <h1>Warehouse software</h1>
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

      <br></br>
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
        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
          </div>

      {showToast && (
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
      )}
    </>
  );
}