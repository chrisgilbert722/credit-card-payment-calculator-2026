import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ textAlign: 'center' }}>
            <h1>Credit Card Minimum vs Extra Payment Calculator (2026)</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Compare estimated payoff outcomes when making minimum versus extra payments
            </p>
        </header>
    );
};
