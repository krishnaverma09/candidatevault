"use client";

import { useEffect, useState } from "react";
import { addDecision, getDecisionById, updateDecision } from "../lib/storage";
import { useRouter, useSearchParams } from "next/navigation";
import "../styles/form.css";

export default function DecisionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    title: "",
    category: "",
    options: "",
    finalChoice: "",
    reasoning: "",
    confidence: 3,
    date: "",
    outcomeStatus: "Pending",
    outcomeNotes: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const existing = getDecisionById(id);
      if (existing) setForm(existing);
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.title ||
      !form.category ||
      !form.finalChoice ||
      !form.reasoning ||
      !form.date
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (form.reasoning.length < 10) {
      setError("Reasoning must be at least 10 characters");
      return;
    }

    if (id) {
      updateDecision({ ...form, id });
    } else {
      addDecision({ ...form, id: Date.now().toString() });
    }

    router.push("/");
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="decision-form">
        <h1>{id ? "Edit Decision" : "Add Decision"}</h1>

        {error && <div className="form-error">{error}</div>}

        <div className="form-section">
          <h2>Decision Details</h2>

          <div className="form-group">
            <label htmlFor="title">
              Decision Title <span className="required">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Choose between two job offers"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Career">Career</option>
              <option value="Study">Study</option>
              <option value="Project">Project</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="options">
              Options Considered <span className="required">*</span>
            </label>
            <textarea
              id="options"
              name="options"
              placeholder="List the main options you considered..."
              value={form.options}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="finalChoice">
              Final Choice <span className="required">*</span>
            </label>
            <input
              id="finalChoice"
              name="finalChoice"
              type="text"
              placeholder="Which option did you choose?"
              value={form.finalChoice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reasoning">
              Reasoning <span className="required">*</span>
            </label>
            <textarea
              id="reasoning"
              name="reasoning"
              placeholder="Why did you make this choice? What factors influenced your decision?"
              value={form.reasoning}
              onChange={handleChange}
              required
            />
            <div className="form-help">Minimum 10 characters</div>
          </div>

          <div className="form-group">
            <label htmlFor="confidence">
              Confidence Level <span className="required">*</span>
            </label>
            <select
              id="confidence"
              name="confidence"
              value={form.confidence}
              onChange={handleChange}
            >
              <option value="1">1 - Not confident</option>
              <option value="2">2 - Somewhat uncertain</option>
              <option value="3">3 - Moderately confident</option>
              <option value="4">4 - Confident</option>
              <option value="5">5 - Very confident</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">
              Decision Date <span className="required">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {id && (
          <div className="outcome-review">
            <h3>Outcome Review</h3>

            <div className="form-group">
              <label htmlFor="outcomeStatus">Outcome Status</label>
              <select
                id="outcomeStatus"
                name="outcomeStatus"
                value={form.outcomeStatus}
                onChange={handleChange}
              >
                <option value="Pending">Pending - Still waiting for results</option>
                <option value="Successful">Successful - Decision worked out well</option>
                <option value="Neutral">Neutral - Mixed or unclear results</option>
                <option value="Failed">Failed - Did not work out as hoped</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="outcomeNotes">Outcome Notes</label>
              <textarea
                id="outcomeNotes"
                name="outcomeNotes"
                placeholder="Reflect on how this decision turned out. What did you learn?"
                value={form.outcomeNotes}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {id ? "Update Decision" : "Save Decision"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
