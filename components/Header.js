"use client";

import Link from "next/link";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="header-title">
          <h1>📋 Candidate Vault</h1>
        </Link>
        <nav className="header-nav">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/add" className="btn-primary">
            + Add Candidate
          </Link>
        </nav>
      </div>
    </header>
  );
}
