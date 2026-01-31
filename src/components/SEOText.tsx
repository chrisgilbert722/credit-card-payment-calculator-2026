import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This credit card payment comparison calculator provides estimated outcomes for paying
                minimum payments versus making extra payments on your credit card balance. Actual
                results will vary based on your specific card agreement, APR changes, fees, and
                payment behavior. The minimum payment calculation assumes a typical floor of $25.
                These figures are estimates only and do not constitute financial advice. Consult
                with a financial advisor for personalized debt repayment strategies.
            </p>
        </div>
    );
};
