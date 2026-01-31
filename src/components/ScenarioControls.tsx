import React from 'react';
import type { CreditCardPaymentInput } from '../logic/creditCardPaymentCalculations';

interface ScenarioControlsProps {
    values: CreditCardPaymentInput;
    onChange: (field: keyof CreditCardPaymentInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const extraPaymentOptions = [
        { label: '$50', value: 50 },
        { label: '$100', value: 100 },
        { label: '$200', value: 200 },
        { label: '$500', value: 500 },
    ];

    const balanceOptions = [
        { label: '$2,500', value: 2500 },
        { label: '$5,000', value: 5000 },
        { label: '$10,000', value: 10000 },
        { label: '$15,000', value: 15000 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Extra Payment Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Extra Payment</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {extraPaymentOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('extraPayment', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.extraPayment === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.extraPayment === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.extraPayment === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Balance Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Balance</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {balanceOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('balance', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.balance === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.balance === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.balance === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
