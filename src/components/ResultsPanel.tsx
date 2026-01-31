import React from 'react';
import type { CreditCardPaymentResult } from '../logic/creditCardPaymentCalculations';

interface ResultsPanelProps {
    result: CreditCardPaymentResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

const formatTime = (months: number): string => {
    if (months >= 600) {
        return '50+ years';
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo`;
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const hasSavings = result.interestSaved > 0;

    return (
        <div className="card" style={{
            background: hasSavings
                ? 'linear-gradient(to bottom, #ECFDF5, #D1FAE5)'
                : 'linear-gradient(to bottom, #F0F9FF, #E8F4FD)',
            borderColor: hasSavings ? '#6EE7B7' : '#93C5FD',
            boxShadow: hasSavings
                ? '0 2px 8px -2px rgba(16, 185, 129, 0.15)'
                : '0 2px 8px -2px rgba(14, 165, 233, 0.15)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Interest Saved
                </h2>
                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: hasSavings ? '#047857' : '#0C4A6E', lineHeight: 1, letterSpacing: '-0.025em' }}>
                    {formatCurrency(result.interestSaved)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.message}
                </div>
            </div>

            <hr style={{ margin: 'var(--space-6) 0', border: 'none', borderTop: `1px solid ${hasSavings ? '#6EE7B7' : '#93C5FD'}` }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TIME SAVED</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: hasSavings ? '#047857' : 'inherit' }}>
                        {formatTime(result.timeSavedMonths)}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${hasSavings ? '#6EE7B7' : '#93C5FD'}`, borderRight: `1px solid ${hasSavings ? '#6EE7B7' : '#93C5FD'}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>NEW PAYOFF</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {result.newPayoffDate}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL SAVED</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: hasSavings ? '#047857' : 'inherit' }}>
                        {formatCurrency(result.totalCostDifference)}
                    </div>
                </div>
            </div>

            {result.extraPayment > 0 && result.timeSavedMonths >= 12 && (
                <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#D1FAE5', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#065F46' }}>
                        Extra payments may significantly reduce your payoff time
                    </span>
                </div>
            )}
        </div>
    );
};
