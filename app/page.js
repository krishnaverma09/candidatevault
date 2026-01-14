"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Mail, Briefcase, Edit, Trash2, X } from "lucide-react";
import {
  getCandidates,
  deleteCandidate
} from "../lib/storage";

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    setCandidates(getCandidates());
  }, []);

  function handleDelete(id) {
    deleteCandidate(id);
    setCandidates(getCandidates());
  }

  function getFilteredCandidates() {
    if (!filterDate) return candidates;
    
    return candidates.filter(c => {
      if (!c.dateAdded) return false;
      return c.dateAdded === filterDate;
    });
  }

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function getInitials(name) {
    if (!name) return "?";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Candidate Directory</h1>
          <p style={styles.subtitle}>Manage and monitor all active platform users</p>
        </div>
      </div>

      <div style={styles.filterSection}>
        <div style={styles.filterControls}>
          <Calendar size={18} color="#6b7280" />
          <span style={styles.filterLabel}>FILTER BY DATE</span>
        </div>
        <input
          id="filterDate"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={styles.dateInput}
          placeholder="mm/dd/yyyy"
        />
      </div>

      {candidates.length === 0 ? (
        <p style={styles.emptyMessage}>No candidates added yet.</p>
      ) : getFilteredCandidates().length === 0 ? (
        <p style={styles.emptyMessage}>No candidates found for the selected date.</p>
      ) : (
        <div style={styles.grid}>
          {getFilteredCandidates().map(c => (
            <div key={c.id} style={styles.card}>
              <div style={styles.cardContent}>
                <div style={styles.avatarSection}>
                  <div style={styles.avatar}>
                    {getInitials(c.name)}
                  </div>
                  <span style={styles.dateBadge}>{formatDate(c.dateAdded)}</span>
                </div>
                
                <div style={styles.infoSection}>
                  <h3 style={styles.candidateName}>{c.name}</h3>
                  
                  <div style={styles.detailRow}>
                    <Mail size={14} color="#6b7280" />
                    <span style={styles.detailText}>{c.email}</span>
                  </div>
                  
                  <div style={styles.detailRow}>
                    <Briefcase size={14} color="#6b7280" />
                    <span style={styles.detailText}>Role: {c.role}</span>
                  </div>
                </div>
              </div>

              <div style={styles.cardFooter}>
                <Link href={`/add?id=${c.id}`} style={{ textDecoration: 'none' }}>
                  <button style={styles.editButton}>
                    <Edit size={16} /> Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(c.id)}
                  style={styles.deleteButton}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const styles = {
  main: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px 24px",
    backgroundColor: "#fafafa",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0 0 8px 0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  filterSection: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px 20px",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  filterControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: "0.5px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  dateInput: {
    padding: "8px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#6b7280",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    minWidth: "200px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    padding: "24px",
    flex: "1",
  },
  avatarSection: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  dateBadge: {
    padding: "4px 12px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    backgroundColor: "#d1fae5",
    color: "#065f46",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  candidateName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1f2937",
    margin: "0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  detailText: {
    fontSize: "13px",
    color: "#6b7280",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  cardFooter: {
    display: "flex",
    gap: "0",
    borderTop: "1px solid #f3f4f6",
  },
  editButton: {
    flex: "1",
    padding: "12px",
    backgroundColor: "transparent",
    color: "#2563eb",
    border: "none",
    borderRight: "1px solid #f3f4f6",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  deleteButton: {
    flex: "1",
    padding: "12px",
    backgroundColor: "transparent",
    color: "#dc2626",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "16px",
    padding: "48px 24px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};
