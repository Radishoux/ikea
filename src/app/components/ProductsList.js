import React from 'react';
import productsData from '../products.json';

export default function ProductsList({ inventory, canBuyProduct, handleBuyProduct }) {
  return (
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
  );
}