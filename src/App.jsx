import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  // 1. CARGA INICIAL: Leemos el localStorage directamente en el useState
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    // Si hay algo guardado lo convertimos a código, si no, empezamos con un arreglo vacío []
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [itemToEdit, setItemToEdit] = useState(null);

  // 2. GUARDADO: Solo necesitamos este useEffect.
  // Cada vez que 'items' cambie, lo guardamos en localStorage.
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  
  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, ...value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), ...value }]);
    }
  };


  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="App">
      <h1>CRUD + LocalStorage</h1>
      <Form 
        addOrUpdateItem={addOrUpdateItem} 
        itemToEdit={itemToEdit} 
      />
      <List 
        items={items} 
        deleteItem={deleteItem} 
        editItem={editItem} 
      />
    </div>
  );
}

export default App;