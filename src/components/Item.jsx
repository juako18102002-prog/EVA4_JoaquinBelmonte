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
          onClick={() => deleteItem(item.id)} 
          className="btn-action btn-delete"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;