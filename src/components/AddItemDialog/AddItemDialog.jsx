import React, { useState } from 'react';

const AddItemDialog = ({ onClose, onAdd }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    unit: 'unidades'
  });

  const handleAdd = () => {
    onAdd(newItem);
    setNewItem({
      name: '',
      quantity: 0,
      unit: 'unidades'
    });
  };

  return (
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
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={handleAdd}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemDialog;