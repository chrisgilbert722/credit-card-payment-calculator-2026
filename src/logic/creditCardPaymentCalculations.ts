export interface CreditCardPaymentInput {
    balance: number;
    apr: number;
    minimumPaymentPercent: number;
    extraPayment: number;
}

export interface CreditCardPaymentResult {
    interestSaved: number;
    timeSavedMonths: number;
    minimumOnlyMonths: number;
    extraPaymentMonths: number;
    minimumOnlyInterest: number;
    extraPaymentInterest: number;
    minimumOnlyTotalCost: number;
    extraPaymentTotalCost: number;
    totalCostDifference: number;
    newPayoffDate: string;
    minimumPayoffDate: string;
    balance: number;
    apr: number;
    minimumPaymentPercent: number;
    extraPayment: number;
    message: string;
}

interface PayoffResult {
    months: number;
    totalInterest: number;
    totalPaid: number;
}

function calculatePayoff(balance: number, apr: number, minPaymentPercent: number, extraPayment: number): PayoffResult {
    if (balance <= 0) {
        return { months: 0, totalInterest: 0, totalPaid: 0 };
    }

    const monthlyRate = apr / 100 / 12;
    let currentBalance = balance;
    let months = 0;
    let totalInterest = 0;
    let totalPaid = 0;
    const maxMonths = 600; // 50 years cap

    while (currentBalance > 0.01 && months < maxMonths) {
        // Calculate interest for this month
        const monthlyInterest = currentBalance * monthlyRate;
        totalInterest += monthlyInterest;

        // Calculate minimum payment (percentage of balance, with typical $25 floor)
        const minPayment = Math.max(currentBalance * (minPaymentPercent / 100), 25);
        const totalPayment = Math.min(minPayment + extraPayment, currentBalance + monthlyInterest);

        totalPaid += totalPayment;
        currentBalance = currentBalance + monthlyInterest - totalPayment;
        months++;

        // Safety check for payments not covering interest
        if (totalPayment <= monthlyInterest && currentBalance > balance) {
            // Payment doesn't cover interest - would never pay off
            return { months: maxMonths, totalInterest: balance * monthlyRate * maxMonths, totalPaid: balance * 2 };
        }
    }

    return { months, totalInterest, totalPaid };
}

function getPayoffDate(monthsFromNow: number): string {
    const date = new Date();
    date.setMonth(date.getMonth() + monthsFromNow);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function calculateCreditCardPayment(input: CreditCardPaymentInput): CreditCardPaymentResult {
    const { balance, apr, minimumPaymentPercent, extraPayment } = input;

    // Calculate minimum payment only scenario
    const minimumOnly = calculatePayoff(balance, apr, minimumPaymentPercent, 0);

    // Calculate with extra payment scenario
    const withExtra = calculatePayoff(balance, apr, minimumPaymentPercent, extraPayment);

    // Calculate savings
    const interestSaved = minimumOnly.totalInterest - withExtra.totalInterest;
    const timeSavedMonths = minimumOnly.months - withExtra.months;
    const totalCostDifference = minimumOnly.totalPaid - withExtra.totalPaid;

    // Get payoff dates
    const minimumPayoffDate = getPayoffDate(minimumOnly.months);
    const newPayoffDate = getPayoffDate(withExtra.months);

    // Generate message
    let message = '';
    if (extraPayment === 0) {
        message = 'Add extra payments to see potential savings';
    } else if (timeSavedMonths >= 12) {
        const years = Math.floor(timeSavedMonths / 12);
        const remainingMonths = timeSavedMonths % 12;
        message = `Pay off ${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''} faster`;
    } else if (timeSavedMonths > 0) {
        message = `Pay off ${timeSavedMonths} month${timeSavedMonths > 1 ? 's' : ''} faster`;
    } else {
        message = 'Adjust extra payment to see time savings';
    }

    return {
        interestSaved,
        timeSavedMonths,
        minimumOnlyMonths: minimumOnly.months,
        extraPaymentMonths: withExtra.months,
        minimumOnlyInterest: minimumOnly.totalInterest,
        extraPaymentInterest: withExtra.totalInterest,
        minimumOnlyTotalCost: minimumOnly.totalPaid,
        extraPaymentTotalCost: withExtra.totalPaid,
        totalCostDifference,
        newPayoffDate,
        minimumPayoffDate,
        balance,
        apr,
        minimumPaymentPercent,
        extraPayment,
        message
    };
}
