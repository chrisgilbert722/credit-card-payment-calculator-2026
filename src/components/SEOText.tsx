import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This calculator compares two credit card repayment scenarios: paying only the minimum
                payment versus adding extra monthly payments to your balance. It estimates the total
                interest paid, payoff timeline, and potential savings for each approach. Actual payoff
                timelines vary based on your card agreement, APR changes, fees, and payment consistency.
                The minimum payment assumes a typical $25 floor. These figures are estimates only and
                are provided for informational purposes.
            </p>
        </div>
    );
};
