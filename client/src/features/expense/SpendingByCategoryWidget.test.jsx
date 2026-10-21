
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SpendingByCategoryWidget from './SpendingByCategoryWidget';
import UserContext from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';

vi.mock('../../hooks/useFetch', () => ({
    default: vi.fn(),
}));

vi.mock('../../components/app-components/widgets/DashWidget', () => ({
    default: ({ children }) => <div>{children}</div>,
}));

vi.mock('recharts', () => ({
    Pie: () => null,
    PieChart: ({ children }) => <div>{children}</div>,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    Tooltip: () => null,
    Sector: () => null,
}));

describe('SpendingByCategoryWidget', () => {
    const user = { _id: 'user-123' };

    const renderWidget = (refreshKey = 0) =>
        render(
            <UserContext.Provider value={{ user }}>
                <SpendingByCategoryWidget refreshKey={refreshKey} />
            </UserContext.Provider>
        );

    beforeEach(() => {
        vi.clearAllMocks();
        useFetch.mockReturnValue({ data: [] });
    });

    afterEach(() => {
        cleanup();
    });

    it('renders a zero total when there are no transactions', () => {
        renderWidget();

        expect(screen.getByText('€0')).toBeTruthy();
        expect(screen.getByText("This month's expenses.")).toBeTruthy();
    });

    it('aggregates transactions belonging to the same category', () => {
        useFetch.mockReturnValue({
            data: [
                { category: 'Groceries', amount: 25 },
                { category: 'Groceries', amount: 15 },
                { category: 'Transport', amount: 10 },
            ],
        });

        renderWidget();

        expect(screen.getByText('Groceries')).toBeTruthy();
        expect(screen.getByText('Transport')).toBeTruthy();
        expect(screen.getByText('Total:')).toBeTruthy();
        expect(screen.getByText('€50')).toBeTruthy();
    });

    it('calculates the total across all categories', () => {
        useFetch.mockReturnValue({
            data: [
                { category: 'Housing', amount: 500 },
                { category: 'Dining', amount: 42.5 },
                { category: 'Shopping', amount: 17.5 },
            ],
        });

        renderWidget();

        expect(screen.getByText('€560')).toBeTruthy();
    });

    it('renders each spending category in the legend', () => {
        useFetch.mockReturnValue({
            data: [
                { category: 'Groceries', amount: 20 },
                { category: 'Health', amount: 30 },
                { category: 'Entertainment', amount: 40 },
            ],
        });

        renderWidget();

        expect(screen.getByText('Groceries')).toBeTruthy();
        expect(screen.getByText('Health')).toBeTruthy();
        expect(screen.getByText('Entertainment')).toBeTruthy();
    });

    it('uses category colors and a fallback color for unknown categories', () => {
        useFetch.mockReturnValue({
            data: [
                { category: 'Groceries', amount: 20 },
                { category: 'Uncategorized', amount: 5 },
            ],
        });

        const { container } = render(
            <UserContext.Provider value={{ user }}>
                <SpendingByCategoryWidget />
            </UserContext.Provider>
        );

        const groceryLegend = screen.getByText('Groceries').parentElement;
        const unknownLegend = screen.getByText('Uncategorized').parentElement;

        expect(groceryLegend.firstElementChild.style.backgroundColor).toBe('rgb(139, 92, 246)');
        expect(unknownLegend.firstElementChild.style.backgroundColor).toBe('rgb(156, 163, 175)');
        expect(container).toBeTruthy();
    });

    it('fetches the current month expenses for the user and passes refreshKey', () => {
        renderWidget(7);

        const [initialState, url, transformData, refreshKey] = useFetch.mock.calls[0];

        const currentDate = new Date();
        const currentMonth = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, '0')}`;

        const query = decodeURIComponent(url.split('?')[1]);

        expect(initialState).toEqual([]);
        expect(url).toContain('data/transactions?');
        expect(query).toContain('type="expense"');
        expect(query).toContain('_ownerId="user-123"');
        expect(query).toContain(`month="${currentMonth}"`);
        expect(transformData).toBeNull();
        expect(refreshKey).toBe(7);
    });
});
