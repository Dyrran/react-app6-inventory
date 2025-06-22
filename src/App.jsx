import React, { useState } from 'react';
import './App.css';
import InventoryList from './components/InventoryList/InventoryList';
import AddItemDialog from './components/AddItemDialog/AddItemDialog';

function App() {
  const [items, setItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddItem = (newItem) => {
    if (newItem.name.trim() === '') return;
    
    setItems([...items, {
      id: Date.now(),
      ...newItem
    }]);
    
    setIsDialogOpen(false);
  };

  const handleQuantityChange = (id, change) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity >= 0 ? newQuantity : 0
        };
      }
      return item;
    }));
  };

  const handleDirectQuantityChange = (id, value) => {
    const numValue = parseInt(value) || 0;
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: numValue >= 0 ? numValue : 0
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Inventario</h1>
        <button 
          className="add-button"
          onClick={() => setIsDialogOpen(true)}
        >
          + Agregar Ítem
        </button>
      </header>

      <InventoryList 
        items={items}
        onQuantityChange={handleQuantityChange}
        onDirectQuantityChange={handleDirectQuantityChange}
        onRemove={handleRemoveItem}
      />

      {isDialogOpen && (
        <AddItemDialog
          onClose={() => setIsDialogOpen(false)}
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
}

export default App;