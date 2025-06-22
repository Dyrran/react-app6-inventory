import React from 'react';
import InventoryItem from '../InventoryItem/InventoryItem';

const InventoryList = ({ items, onQuantityChange, onDirectQuantityChange, onRemove }) => {
  return (
    <div className="inventory-list">
      {items.map(item => (
        <InventoryItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onDirectQuantityChange={onDirectQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default InventoryList;