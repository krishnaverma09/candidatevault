import '../styles/card.css';

export default function DecisionCard({ decision, onDelete }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="decision-card">
      <div className="card-header">
        <h2 className="card-title">{decision.title}</h2>
        <span className="card-date">{formatDate(decision.timestamp)}</span>
      </div>

      <div className="card-content">
        <p className="card-description">{decision.description}</p>

        {decision.options && decision.options.length > 0 && (
          <div className="card-options">
            <h3>Options:</h3>
            <ul>
              {decision.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}

        {decision.chosenOption && (
          <div className="card-chosen">
            <strong>Chosen: </strong> {decision.chosenOption}
          </div>
        )}
      </div>

      <div className="card-footer">
        <button
          className="btn-delete"
          onClick={() => onDelete(decision.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
