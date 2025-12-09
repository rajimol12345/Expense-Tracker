// src/components/ExpenseModal.jsx
import React, { useState, useEffect, useCallback } from "react";

export default function ExpenseModal({ initial = null, onClose, onCreate, onUpdate }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setAmount(initial.amount ?? "");
      setCategory(initial.category || "Other");
      setDate(initial.date ? new Date(initial.date).toISOString().slice(0, 10) : "");
    } else {
      setTitle("");
      setAmount("");
      setCategory("Other");
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [initial]);

  const submit = useCallback(async (e) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }
    const form = { title, amount: Number(amount), category, date };
    if (initial) {
      await onUpdate(initial.id, form, file);
    } else {
      await onCreate(form, file);
    }
  }, [title, amount, category, date, file, initial, onCreate, onUpdate]);

  return (
    <div className="modal-backdrop">
      <div className="modal card">
        <h3>{initial ? "Edit Expense" : "Add Expense"}</h3>
        <form onSubmit={submit}>
          <input placeholder="Title (optional)" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} required />
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Utilities</option>
            <option>Other</option>
          </select>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} accept="image/*" />
          <div className="modal-actions">
            <button type="submit">{initial ? "Save" : "Add"}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
