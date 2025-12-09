// src/components/ExpenseItem.jsx
import React from "react";
import { format } from "date-fns";

export default function ExpenseItem({ e, onEdit, onDelete }) {
  return (
    <li className="expense-item">
      <div>
        <strong>{e.title || e.category}</strong>
        <div className="muted">{format(new Date(e.date), "PPP")}</div>
        {e.receiptUrl && <div><a href={e.receiptUrl} target="_blank" rel="noreferrer">Receipt</a></div>}
      </div>
      <div className="actions">
        <div>₹{Number(e.amount).toFixed(2)}</div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}
