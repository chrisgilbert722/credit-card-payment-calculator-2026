export interface ContributionLimitInput {
    annualSalary: number;
    contributionsYTD: number;
    contributionType: 'traditional' | 'roth';
    age: number;
}

export interface ContributionLimitResult {
    remainingContribution: number;
    totalAllowedContribution: number;
    catchUpAmount: number;
    baseLimit: number;
    contributionsYTD: number;
    percentUsed: number;
    isCatchUpEligible: boolean;
    monthsRemaining: number;
    suggestedMonthlyContribution: number;
    annualSalary: number;
    contributionType: 'traditional' | 'roth';
    age: number;
    message: string;
}

// 2026 estimated contribution limits
const BASE_LIMIT_2026 = 23500;
const CATCH_UP_LIMIT_2026 = 7500;
const CATCH_UP_AGE = 50;

export function calculateContributionLimit(input: ContributionLimitInput): ContributionLimitResult {
    const { annualSalary, contributionsYTD, contributionType, age } = input;

    // Determine if catch-up eligible
    const isCatchUpEligible = age >= CATCH_UP_AGE;

    // Calculate limits
    const baseLimit = BASE_LIMIT_2026;
    const catchUpAmount = isCatchUpEligible ? CATCH_UP_LIMIT_2026 : 0;
    const totalAllowedContribution = baseLimit + catchUpAmount;

    // Calculate remaining contribution
    const remainingContribution = Math.max(0, totalAllowedContribution - contributionsYTD);

    // Calculate percentage used
    const percentUsed = totalAllowedContribution > 0
        ? (contributionsYTD / totalAllowedContribution) * 100
        : 0;

    // Estimate months remaining in year (assuming current month is partial)
    const currentMonth = new Date().getMonth(); // 0-11
    const monthsRemaining = Math.max(1, 12 - currentMonth);

    // Suggested monthly contribution to max out
    const suggestedMonthlyContribution = remainingContribution > 0
        ? remainingContribution / monthsRemaining
        : 0;

    // Generate message
    let message = '';
    if (remainingContribution === 0) {
        message = 'You have reached your contribution limit for the year';
    } else if (percentUsed >= 75) {
        message = `You're ${percentUsed.toFixed(0)}% toward the annual limit`;
    } else if (isCatchUpEligible) {
        message = `Includes $${catchUpAmount.toLocaleString()} catch-up contribution`;
    } else {
        message = `${contributionType === 'traditional' ? 'Traditional 401(k)' : 'Roth 401(k)'} limit for 2026`;
    }

    return {
        remainingContribution,
        totalAllowedContribution,
        catchUpAmount,
        baseLimit,
        contributionsYTD,
        percentUsed,
        isCatchUpEligible,
        monthsRemaining,
        suggestedMonthlyContribution,
        annualSalary,
        contributionType,
        age,
        message
    };
}
