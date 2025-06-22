import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    unit: 'unidades'
  });

  const handleAddItem = () => {
    if (newItem.name.trim() === '') return;
    
    setItems([...items, {
      id: Date.now(),
      ...newItem
    }]);
    
    setNewItem({
      name: '',
      quantity: 0,
      unit: 'unidades'
    });
    
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

      <div className="inventory-list">
        {items.map(item => (
          <InventoryItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onDirectQuantityChange={handleDirectQuantityChange}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>

      {isDialogOpen && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <h2>Agregar nuevo ítem</h2>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                placeholder="Ej. Arroz"
              />
            </div>
            <div className="form-group">
              <label>Cantidad:</label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Unidad de medida:</label>
              <select
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              >
                <option value="unidades">unidades</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="litros">litros</option>
                <option value="ml">ml</option>
                <option value="paquetes">paquetes</option>
              </select>
            </div>
            <div className="dialog-buttons">
              <button className="cancel-button" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </button>
              <button className="confirm-button" onClick={handleAddItem}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryItem({ item, onQuantityChange, onDirectQuantityChange, onRemove }) {
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
}

export default App;