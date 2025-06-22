import React, { useState } from 'react';

const InventoryItem = ({ item, onQuantityChange, onDirectQuantityChange, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.quantity.toString());

  const handleSave = () => {
    onDirectQuantityChange(item.id, parseInt(editValue) || 0);
    setIsEditing(false);
  };

  return (
    <div className="inventory-item">
      <div className="item-name">{item.name}</div>
      <div className="item-quantity-container">
        {isEditing ? (
          <div className="quantity-edit">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            <span className="item-unit">{item.unit}</span>
          </div>
        ) : (
          <div 
            className="item-quantity"
            onClick={() => {
              setEditValue(item.quantity.toString());
              setIsEditing(true);
            }}
          >
            <span>{item.quantity}</span>
            <span className="item-unit">{item.unit}</span>
          </div>
        )}
      </div>
      <div className="item-buttons">
        <button 
          className="quantity-button minus"
          onClick={() => onQuantityChange(item.id, -1)}
        >
          -
        </button>
        <button 
          className="quantity-button plus"
          onClick={() => onQuantityChange(item.id, 1)}
        >
          +
        </button>
        <button 
          className="remove-button"
          onClick={() => onRemove(item.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;