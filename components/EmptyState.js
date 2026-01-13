import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <h2>No decisions yet</h2>
        <p>Start making decisions and log them here.</p>
        <Link href="/add" className="empty-state-cta">
          Create Your First Decision
        </Link>
      </div>
    </div>
  );
}
