import React from 'react';
import type { CreditCardPaymentResult } from '../logic/creditCardPaymentCalculations';

interface BreakdownTableProps {
    result: CreditCardPaymentResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
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
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const inputRows = [
        { label: 'Balance', value: formatMoney(result.balance), isTotal: false },
        { label: 'Annual Percentage Rate (APR)', value: `${result.apr.toFixed(2)}%`, isTotal: false },
        { label: 'Minimum Payment Percentage', value: `${result.minimumPaymentPercent}%`, isTotal: false },
        { label: 'Extra Monthly Payment', value: formatMoney(result.extraPayment), isTotal: false },
    ];

    const minimumOnlyRows = [
        { label: 'Estimated Time to Pay Off', value: formatTime(result.minimumOnlyMonths), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.minimumOnlyInterest), isTotal: false },
        { label: 'Estimated Total Cost', value: formatMoney(result.minimumOnlyTotalCost), isTotal: true },
        { label: 'Estimated Payoff Date', value: result.minimumPayoffDate, isTotal: false },
    ];

    const extraPaymentRows = [
        { label: 'Estimated Time to Pay Off', value: formatTime(result.extraPaymentMonths), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.extraPaymentInterest), isTotal: false },
        { label: 'Estimated Total Cost', value: formatMoney(result.extraPaymentTotalCost), isTotal: true },
        { label: 'Estimated Payoff Date', value: result.newPayoffDate, isTotal: false },
    ];

    const savingsRows = [
        { label: 'Time Saved', value: formatTime(result.timeSavedMonths), isTotal: false },
        { label: 'Interest Saved', value: formatMoney(result.interestSaved), isTotal: false },
        { label: 'Total Cost Difference', value: formatMoney(result.totalCostDifference), isTotal: true },
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
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
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
            {/* Input Details Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Your Credit Card Details</h3>
            </div>
            {renderTable(inputRows)}

            {/* Minimum Payment Only Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#FEF3C7' }}>
                <h3 style={{ fontSize: '1rem', color: '#92400E' }}>Minimum Payment Only Scenario</h3>
            </div>
            {renderTable(minimumOnlyRows)}

            {/* With Extra Payment Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#D1FAE5' }}>
                <h3 style={{ fontSize: '1rem', color: '#065F46' }}>With Extra Payment Scenario</h3>
            </div>
            {renderTable(extraPaymentRows)}

            {/* Savings Comparison Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Estimated Savings</h3>
            </div>
            {renderTable(savingsRows, true)}
        </div>
    );
};
