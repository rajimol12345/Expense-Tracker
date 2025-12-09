// src/pages/Settings.jsx
import React from "react";
import { auth } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Settings({ user }) {
  const [displayName, setDisplayName] = useState(user.displayName || "");

  const save = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="page card">
      <h2>Settings</h2>
      <label>Display name</label>
      <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      <button onClick={save}>Save</button>
      <button onClick={() => (window.location.href = "/dashboard")}>Back</button>
    </div>
  );
}
