"use client";
import { useState, useEffect } from 'react';
import inventoryData from './inventory.json';
import productsData from './products.json';

export default function Home() {
  const [inventory, setInventory] = useState(inventoryData.inventory);
  const [form, setForm] = useState({ name: '', art_id: '', stock: '' });
  const [showToast, setShowToast] = useState(false);
  const [money, setMoney] = useState(100);

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

  const canBuyProduct = (product) => {
    // Check inventory and money
    const enoughParts = product.contain_articles.every(part => {
      const inv = inventory.find(item => item.art_id === part.art_id);
      return inv && Number(inv.stock) >= Number(part.amount_of);
    });
    return enoughParts && money >= (product.price || 0);
  };

  const handleBuyProduct = (product) => {
    if (!canBuyProduct(product)) return;
    setInventory(prev =>
      prev.map(item => {
        const part = product.contain_articles.find(p => p.art_id === item.art_id);
        if (part) {
          return {
            ...item,
            stock: String(Number(item.stock) - Number(part.amount_of))
          };
        }
        return item;
      })
    );
    setMoney(prev => prev - (product.price || 0));
  };

  const handleDeposit = () => {
    setMoney(prev => prev + 100);
  };

  return (
    <>
      <h1>Warehouse software</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Money: ${money}</span>
        <button
          className='add-btn'
          onClick={handleDeposit}
        >
          Deposit $100
        </button>
      </div>
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

      <br />
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

      <br />
      <div className="area">
        <h2>Products to Sell</h2>
        <ul>
          {productsData.products.map(product => (
            <li key={product.name} style={{ marginBottom: '24px' }}>
              <strong>{product.name}</strong> <span style={{ marginLeft: '12px', color: '#555' }}>${product.price || 0}</span>
              <ul>
                {product.contain_articles.map(part => {
                  const inv = inventory.find(item => item.art_id === part.art_id);
                  return (
                    <li key={part.art_id}>
                      {inv ? inv.name : 'Unknown'} (ID: {part.art_id}) - Needed: {part.amount_of} / In Stock: {inv ? inv.stock : 0}
                    </li>
                  );
                })}
              </ul>
              <button
                className="add-btn"
                style={{ marginLeft: '0', marginTop: '8px' }}
                disabled={!canBuyProduct(product)}
                onClick={() => handleBuyProduct(product)}
              >
                Buy
              </button>
            </li>
          ))}
        </ul>
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