import React from 'react';
import type { CreditCardPaymentInput } from '../logic/creditCardPaymentCalculations';

interface InputCardProps {
    values: CreditCardPaymentInput;
    onChange: (field: keyof CreditCardPaymentInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Credit Card Balance */}
                <div>
                    <label htmlFor="balance">Credit Card Balance ($)</label>
                    <input
                        type="number"
                        id="balance"
                        value={values.balance}
                        onChange={(e) => onChange('balance', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="100"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your current credit card balance
                    </span>
                </div>

                {/* APR */}
                <div>
                    <label htmlFor="apr">Annual Percentage Rate (APR) %</label>
                    <input
                        type="number"
                        id="apr"
                        value={values.apr}
                        onChange={(e) => onChange('apr', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your card's annual interest rate (check your statement)
                    </span>
                </div>

                {/* Minimum Payment Percent */}
                <div>
                    <label htmlFor="minimumPaymentPercent">Minimum Payment Percentage (%)</label>
                    <input
                        type="number"
                        id="minimumPaymentPercent"
                        value={values.minimumPaymentPercent}
                        onChange={(e) => onChange('minimumPaymentPercent', parseFloat(e.target.value) || 0)}
                        min="1"
                        max="10"
                        step="0.5"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Typically 2-3% of your balance (check your card agreement)
                    </span>
                </div>

                {/* Extra Monthly Payment */}
                <div>
                    <label htmlFor="extraPayment">Extra Monthly Payment ($)</label>
                    <input
                        type="number"
                        id="extraPayment"
                        value={values.extraPayment}
                        onChange={(e) => onChange('extraPayment', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="25"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Additional amount to pay above the minimum each month
                    </span>
                </div>
            </div>
        </div>
    );
};
