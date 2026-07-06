import React from "react";

function Item({ item, deleteItem, editItem, toggleComplete }) {
  return (
    <li className="item-row">
      <span 
        onClick={() => toggleComplete(item.id)} 
        className={`item-text ${item.completado ? "completed-text" : ""}`}
        style={{ cursor: 'pointer' }}
        title="Haz clic para marcar como completado"
      >
        {item.completado ? "✅ " : "📌 "}
        {item.value}
      </span>
      
      <div className="item-actions">
        {!item.completado && (
          <button 
            onClick={() => editItem(item)} 
            className="btn-action btn-edit"
          >
            Editar
          </button>
        )}
        <button 
          onClick={() => {
            if (window.confirm(`¿Estás seguro de que deseas eliminar "${item.value}"?`)) {
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