import React from 'react';
import type { ContributionLimitResult } from '../logic/contributionLimitCalculations';

interface ResultsPanelProps {
    result: ContributionLimitResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(val);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    return (
        <div className="card" style={{
            background: 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)',
            borderColor: '#86EFAC',
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Remaining Contribution
                </h2>
                <div style={{
                    fontSize: '2.75rem',
                    fontWeight: 800,
                    color: '#166534',
                    lineHeight: 1,
                    letterSpacing: '-0.025em'
                }}>
                    {formatCurrency(result.remainingContribution)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.message}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: '1px solid #86EFAC'
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL ALLOWED</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#166534' }}>
                        {formatCurrency(result.totalAllowedContribution)}
                    </div>
                </div>
                <div style={{ borderLeft: '1px solid #86EFAC', borderRight: '1px solid #86EFAC' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>CATCH-UP</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {result.isCatchUpEligible ? formatCurrency(result.catchUpAmount) : 'N/A'}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>% USED</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {result.percentUsed.toFixed(0)}%
                    </div>
                </div>
            </div>
        </div>
    );
};
