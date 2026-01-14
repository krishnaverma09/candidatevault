"use client";

import { useEffect, useState } from "react";
import {
  addCandidate,
  getCandidateById,
  updateCandidate
} from "../lib/storage";
import { useRouter, useSearchParams } from "next/navigation";

export default function CandidateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const existing = getCandidateById(id);
      if (existing) setForm(existing);
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.role) {
      setError("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (id) {
      updateCandidate({ ...form, id });
    } else {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const dateAdded = `${year}-${month}-${day}`;
      addCandidate({ ...form, id: Date.now().toString(), dateAdded });
    }

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.formTitle}>{id ? "Edit Candidate" : "Add Candidate"}</h2>

      {error && <p style={styles.errorMessage}>{error}</p>}

      <input
        name="name"
        placeholder="Candidate Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        {id ? "Update" : "Save"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: "#ffffff",
    padding: "32px",
    maxWidth: "500px",
    margin: "24px auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 16px 0",
    color: "#1f2937",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#1f2937",
    backgroundColor: "#ffffff",
    fontFamily: "inherit",
    transition: "border-color 0.2s ease",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
    marginTop: "8px",
  },
  errorMessage: {
    color: "#dc2626",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0",
  },
};
