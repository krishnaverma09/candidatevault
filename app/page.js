"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDecisions, deleteDecision } from "../lib/storage";
import "../styles/card.css";

export default function Home() {
  const [decisions, setDecisions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [outcome, setOutcome] = useState("");

  useEffect(() => {
    const data = getDecisions().sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setDecisions(data);
  }, []);

  function handleDelete(id) {
    deleteDecision(id);
    setDecisions(getDecisions());
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Successful":
        return "status-successful";
      case "Neutral":
        return "status-neutral";
      case "Failed":
        return "status-failed";
      default:
        return "status-pending";
    }
  };

  const filtered = decisions.filter(d =>
    (!category || d.category === category) &&
    (!outcome || d.outcomeStatus === outcome) &&
    (d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.reasoning.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main>
      <h1>Decision Timeline</h1>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search decisions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Career">Career</option>
            <option value="Study">Study</option>
            <option value="Project">Project</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="outcome">Outcome Status</label>
          <select
            id="outcome"
            value={outcome}
            onChange={e => setOutcome(e.target.value)}
          >
            <option value="">All Outcomes</option>
            <option value="Pending">Pending</option>
            <option value="Successful">Successful</option>
            <option value="Neutral">Neutral</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Decision Cards */}
      {filtered.length > 0 ? (
        filtered.map(d => (
          <div key={d.id} className="decision-card">
            <div className="card-header">
              <h3 className="card-title">{d.title}</h3>
              <span className="card-date">{d.date}</span>
            </div>
            <div className="card-content">
              <p className="card-description">{d.reasoning}</p>
              
              <div className="card-meta">
                <span className="badge badge-primary">{d.category}</span>
                <span className={`status-badge ${getStatusColor(d.outcomeStatus)}`}>
                  {d.outcomeStatus}
                </span>
                <span className="card-meta-item">⭐ {d.confidence}</span>
              </div>
            </div>
            <div className="card-footer">
              <Link href={`/add?id=${d.id}`} className="btn-secondary">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(d.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <div className="empty-state-content">
            <h2>No decisions yet</h2>
            <p>Create your first decision to get started tracking important choices.</p>
            <Link href="/add" className="btn-primary">
              Create Decision
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
