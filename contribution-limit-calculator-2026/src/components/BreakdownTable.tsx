import React from 'react';
import type { ContributionLimitResult } from '../logic/contributionLimitCalculations';

interface BreakdownTableProps {
    result: ContributionLimitResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const limitRows = [
        { label: '2026 Base Limit', value: formatMoney(result.baseLimit), isTotal: false },
        { label: 'Catch-Up Amount (50+)', value: result.isCatchUpEligible ? formatMoney(result.catchUpAmount) : '$0', isTotal: false },
        { label: 'Estimated Total Allowed', value: formatMoney(result.totalAllowedContribution), isTotal: true },
    ];

    const progressRows = [
        { label: 'Contributions Made YTD', value: formatMoney(result.contributionsYTD), isTotal: false },
        { label: 'Remaining Allowance', value: formatMoney(result.remainingContribution), isTotal: false },
        { label: 'Suggested Monthly', value: formatMoney(result.suggestedMonthlyContribution), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? '#166534' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Contribution Limits Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Contribution Limits</h3>
            </div>
            {renderTable(limitRows)}

            {/* Progress Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0FDF4' }}>
                <h3 style={{ fontSize: '1rem', color: '#166534' }}>Your Progress</h3>
            </div>
            {renderTable(progressRows, true)}
        </div>
    );
};
