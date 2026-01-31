import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ textAlign: 'center' }}>
            <h1>Contribution Limit Calculator (2026)</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Estimate remaining allowable retirement contributions
            </p>
        </header>
    );
};
