import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [itemToEdit, setItemToEdit] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, ...value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), completado: false, ...value }]);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  const toggleComplete = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completado: !item.completado } : item
    ));
  };

  // borrar todos los elementos (conf)
  const clearAllItems = () => {
    if (window.confirm("¿Estás seguro de que deseas borrar TODOS los elementos?")) {
      setItems([]);
    }
  };

  // se filtran elementos segun lo que se escriba en el buscador
  const filteredItems = items.filter(item => 
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-title">CRUD + LocalStorage</h1>
      
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      
      {/* BUSCADOR */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Buscar elemento..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="items-counter">
        Total de elementos: <strong>{filteredItems.length}</strong>
      </div>

      {/* lista filtradora */}
      <List 
        items={filteredItems} 
        deleteItem={deleteItem} 
        editItem={editItem} 
        toggleComplete={toggleComplete} 
      />

      {/* Boton para borra todo */}
      {items.length > 0 && (
        <button onClick={clearAllItems} className="btn-clear-all">
          Borrar Todo
        </button>
      )}
    </div>
  );
}

export default App;