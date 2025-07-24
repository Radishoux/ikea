"use client";
import { useState, useEffect } from 'react';
import inventoryData from './inventory.json';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import ProductsList from './components/ProductsList';
import MoneyBar from './components/MoneyBar';
import Toast from './components/Toast';

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
      prev.map(item => {
        if (item.art_id === art_id && Number(item.stock) > 0) {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
          return { ...item, stock: String(Number(item.stock) + 1) };
        }
        return item;
      })
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
      <MoneyBar money={money} handleDeposit={handleDeposit} />
      <InventoryList inventory={inventory} handleAdd={handleAdd} />
      <br />
      <InventoryForm
        form={form}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        isFormValid={isFormValid}
      />
      <br />
      <ProductsList
        inventory={inventory}
        canBuyProduct={canBuyProduct}
        handleBuyProduct={handleBuyProduct}
      />
      <Toast showToast={showToast} />
    </>
  );
}