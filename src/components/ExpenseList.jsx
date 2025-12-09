// src/components/ExpenseList.jsx
import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses = [], onEdit, onDelete }) {
  return (
    <div className="expense-list card">
      <h3>Expenses</h3>
      {expenses.length === 0 && <p>No expenses yet</p>}
      <ul>
        {expenses.map((e) => (
          <ExpenseItem key={e.id} e={e} onEdit={() => onEdit(e)} onDelete={() => onDelete(e.id)} />
        ))}
      </ul>
    </div>
  );
}
