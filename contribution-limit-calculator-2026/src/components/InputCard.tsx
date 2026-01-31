import React from 'react';
import type { ContributionLimitInput } from '../logic/contributionLimitCalculations';

interface InputCardProps {
    values: ContributionLimitInput;
    onChange: (field: keyof ContributionLimitInput, value: number | boolean | string) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Annual Salary */}
                <div>
                    <label htmlFor="annualSalary">Annual Salary ($)</label>
                    <input
                        type="number"
                        id="annualSalary"
                        value={values.annualSalary}
                        onChange={(e) => onChange('annualSalary', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="1000"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your gross annual salary
                    </span>
                </div>

                {/* Contributions Year-to-Date */}
                <div>
                    <label htmlFor="contributionsYTD">Contributions Year-to-Date ($)</label>
                    <input
                        type="number"
                        id="contributionsYTD"
                        value={values.contributionsYTD}
                        onChange={(e) => onChange('contributionsYTD', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="500"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Total amount contributed so far this year
                    </span>
                </div>

                {/* Contribution Type */}
                <div>
                    <label htmlFor="contributionType">Contribution Type</label>
                    <select
                        id="contributionType"
                        value={values.contributionType}
                        onChange={(e) => onChange('contributionType', e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'var(--space-3)',
                            fontSize: '1rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            background: '#fff'
                        }}
                    >
                        <option value="traditional">Traditional 401(k)</option>
                        <option value="roth">Roth 401(k)</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Type of retirement account
                    </span>
                </div>

                {/* Age */}
                <div>
                    <label htmlFor="age">Your Age</label>
                    <input
                        type="number"
                        id="age"
                        value={values.age}
                        onChange={(e) => onChange('age', parseFloat(e.target.value) || 0)}
                        min="18"
                        max="100"
                        step="1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Age 50+ qualifies for catch-up contributions
                    </span>
                </div>
            </div>
        </div>
    );
};
