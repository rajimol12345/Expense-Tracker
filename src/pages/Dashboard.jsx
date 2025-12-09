// src/pages/Dashboard.jsx
import React, { useEffect, useCallback, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";
import { useExpenseStore } from "../store/expenseStore";
import ExpenseList from "../components/ExpenseList";
import ExpenseModal from "../components/ExpenseModal";
import MonthlyChart from "../components/MonthlyChart";
import { toast } from "react-toastify";

export default function Dashboard({ user }) {
  const {
    expenses,
    setExpenses,
    setLoading,
    addExpenseLocal,
    updateExpenseLocal,
    removeExpenseLocal,
  } = useExpenseStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetchExpenses(user.uid);
      setExpenses(data);
    } catch (err) {
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, [user.uid, setExpenses, setLoading]);

  useEffect(() => {
    load();
  }, [load]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.info("Signed out");
  };

  const handleCreate = async (form, file) => {
    try {
      const saved = await createExpense(user.uid, form, file);
      addExpenseLocal(saved);
      toast.success("Expense added");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to create expense");
    }
  };

  const handleUpdate = async (id, updates, file) => {
    try {
      const updated = await updateExpense(user.uid, id, updates, file);
      updateExpenseLocal(id, updated);
      toast.success("Expense updated");
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await deleteExpense(id);
      removeExpenseLocal(id);
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Expense Tracker</h1>

        <div>
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            Add Expense
          </button>

          <button onClick={() => (window.location.href = "/settings")}>
            Settings
          </button>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="content">
        <section className="chart">
          <MonthlyChart expenses={expenses} />
        </section>

        <section className="list">
          <ExpenseList
            expenses={expenses}
            onEdit={(item) => {
              setEditing(item);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {modalOpen && (
        <ExpenseModal
          initial={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
