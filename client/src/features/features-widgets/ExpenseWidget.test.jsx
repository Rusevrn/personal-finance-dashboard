
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ExpenseWidget from './ExpenseWidget';
import UserContext from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';

vi.mock('../../hooks/useFetch', () => ({
    default: vi.fn(),
}));

vi.mock('../../components/app-components/widgets/DashWidget', () => ({
    default: ({ children }) => <div>{children}</div>,
}));

describe('ExpenseWidget', () => {
    const user = { _id: 'user-123' };

    const renderWidget = (refreshKey = 0, size = 'medium') =>
        render(
            <UserContext.Provider value={{ user }}>
                <ExpenseWidget size={size} refreshKey={refreshKey} />
            </UserContext.Provider>
        );

    beforeEach(() => {
        vi.clearAllMocks();
        useFetch.mockReturnValue({ data: [] });
    });

    afterEach(() => {
        cleanup();
    });

    it('renders zero when there are no expense transactions', () => {
        renderWidget();

        expect(screen.getByText('-€0')).toBeTruthy();
    });

    it('sums the amounts of the fetched transactions', () => {
        useFetch.mockReturnValue({
            data: [
                { amount: 25 },
                { amount: 49.5 },
                { amount: 10 },
            ],
        });

        renderWidget();

        expect(screen.getByText('-€84.5')).toBeTruthy();
    });

    it('fetches transactions for the current month and logged-in user', () => {
        renderWidget();

        const currentDate = new Date();
        const currentMonth = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, '0')}`;

        const [initialState, url, transformData, refreshKey] =
            useFetch.mock.calls[0];

        expect(initialState).toEqual([]);
        expect(url).toContain('data/transactions?');

        const query = decodeURIComponent(url.split('?')[1]);

        expect(query).toContain('type="expense"');
        expect(query).toContain('_ownerId="user-123"');
        expect(query).toContain(`month="${currentMonth}"`);
        expect(transformData).toBeNull();
        expect(refreshKey).toBe(0);
    });

    it('passes refreshKey to useFetch', () => {
        renderWidget(7);

        expect(useFetch.mock.calls[0][3]).toBe(7);
    });

    it('renders the expense widget label and formatted total', () => {
        useFetch.mockReturnValue({
            data: [{ amount: 123.45 }],
        });

        renderWidget();

        expect(screen.getByText('Expenses /m')).toBeTruthy();
        expect(screen.getByText('-€123.45')).toBeTruthy();
    });
});
