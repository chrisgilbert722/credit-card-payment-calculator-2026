import React from 'react';
import type { ContributionLimitInput } from '../logic/contributionLimitCalculations';

interface ScenarioControlsProps {
    values: ContributionLimitInput;
    onChange: (field: keyof ContributionLimitInput, value: number | boolean | string) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const ytdOptions = [
        { label: '$0', value: 0 },
        { label: '$5k', value: 5000 },
        { label: '$10k', value: 10000 },
        { label: '$15k', value: 15000 },
    ];

    const ageOptions = [
        { label: '30', value: 30 },
        { label: '40', value: 40 },
        { label: '50', value: 50 },
        { label: '55', value: 55 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* YTD Contribution Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Contributions YTD</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {ytdOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('contributionsYTD', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.contributionsYTD === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.contributionsYTD === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.contributionsYTD === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Age Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Age</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {ageOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('age', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.age === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.age === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.age === option.value ? '#fff' : 'var(--color-text-primary)',
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
