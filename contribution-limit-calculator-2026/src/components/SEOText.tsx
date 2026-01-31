import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This contribution limit calculator estimates remaining allowable 401(k) contributions based on
                2026 IRS limits. These figures are estimates only and actual limits may vary based on plan rules,
                employer policies, and individual circumstances. Catch-up contributions apply to those age 50
                and older. This calculator is for informational purposes and does not constitute tax or
                investment advice. Consult your plan administrator or tax professional for guidance.
            </p>
        </div>
    );
};
