import React from "react";

function Item({ item, deleteItem, editItem }) {
  return (
    <li className="item-row">
      <span className="item-text">{item.value}</span>
      <div className="item-actions">
        <button 
          onClick={() => editItem(item)} 
          className="btn-action btn-edit"
        >
          Editar
        </button>
        <button 
          onClick={() => {
            if (window.confirm(`¿Seguro de que deseas eliminar "${item.value}"?`)) {
              deleteItem(item.id);
            }
          }} 
          className="btn-action btn-delete"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;