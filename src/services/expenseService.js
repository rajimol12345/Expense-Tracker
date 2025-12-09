// src/services/expenseService.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";

// collection path: expenses
const expensesCol = collection(db, "expenses");

// create
export async function createExpense(userId, expense, file) {
  const data = {
    userId,
    title: expense.title,
    amount: Number(expense.amount),
    category: expense.category,
    date: expense.date ? new Date(expense.date) : new Date(),
    createdAt: serverTimestamp(),
  };

  if (file) {
    const filePath = `receipts/${userId}/${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    data.receiptUrl = url;
  }

  const docRef = await addDoc(expensesCol, data);
  const saved = { id: docRef.id, ...data };
  return saved;
}

// read (all for user)
export async function fetchExpenses(userId) {
  const q = query(expensesCol, where("userId", "==", userId), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  // Convert Firestore Timestamp to JS Date if needed
  return items.map((it) => ({ ...it, date: it.date?.toDate ? it.date.toDate() : it.date }));
}

// update
export async function updateExpense(userId, id, updates, file) {
  const docRef = doc(db, "expenses", id);
  const payload = { ...updates };
  if (payload.amount) payload.amount = Number(payload.amount);
  if (payload.date) payload.date = new Date(payload.date);

  if (file) {
    const filePath = `receipts/${userId}/${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    payload.receiptUrl = url;
  }

  await updateDoc(docRef, payload);
  return { id, ...payload };
}

// delete
export async function deleteExpense(id) {
  const docRef = doc(db, "expenses", id);
  await deleteDoc(docRef);
  return id;
}
