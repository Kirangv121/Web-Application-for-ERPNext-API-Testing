import React, { useEffect } from 'react';

const Navigation = ({ onGoBack, canGoBack, currentPage }) => {
  // Add keyboard shortcut for back button
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        onGoBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onGoBack]);
  const getPageTitle = () => {
    switch (currentPage) {
      case '/request': return 'Request Builder';
      case '/response': return 'Response Viewer';
      default: return 'Page';
    }
  };

  return (
    <div className="navigation">
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">🧭 {getPageTitle()}</h3>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Use the back button to return to the previous page (Alt + ←)
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-secondary"
              onClick={onGoBack}
              disabled={!canGoBack}
              title="Go back to the previous page (Alt + ←)"
            >
              ← Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => window.location.href = '/'}
            >
              🏠 Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
