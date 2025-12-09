// src/pages/Register.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created");
      nav("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="auth-page">
      <form onSubmit={submit} className="card">
        <h2>Register</h2>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" minLength={6} required />
        <button>Create account</button>
        <p>Already have account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
