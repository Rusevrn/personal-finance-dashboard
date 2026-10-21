import { render, screen, waitFor, cleanup, } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, afterEach,} from 'vitest';
import BudgetCategoryWidget from './BudgetCategoryWidget';
import UserContext from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';

afterEach(() => {
    cleanup();
});

vi.mock('../../hooks/useFetch', () => ({
    default: vi.fn()
}));

vi.mock('../../components/app-components/widgets/DashWidget', () => ({
    default: ({ children }) => <div>{children}</div>
}));

describe('BudgetCategoryWidget', () => {
    let setRemainingBudget;
    let setBudgets;

    const budgets = [
        { category: 'Groceries', limit: 500 },
        { category: 'Housing', limit: 800 }
    ];

    const transactions = [
        { category: 'Groceries', amount: 150, type: 'expense' },
        { category: 'Groceries', amount: 100, type: 'expense' },
        { category: 'Housing', amount: 800, type: 'expense' }
    ];

    const renderWidget = (props = {}) =>
        render(
            <UserContext.Provider value={{ user: { _id: 'user-1' } }}>
                <BudgetCategoryWidget
                    setRemainingBudget={setRemainingBudget}
                    setBudgets={setBudgets}
                    {...props}
                />
            </UserContext.Provider>
        );

    beforeEach(() => {
        vi.clearAllMocks();

        setRemainingBudget = vi.fn();
        setBudgets = vi.fn();

        useFetch.mockReset().mockImplementation((initialState, url) => {
            if (url.startsWith('data/budgets?')) {
                return { data: budgets };
            }

            if (url.startsWith('data/transactions?')) {
                return { data: transactions };
            }

            return { data: initialState };
        });
    });

    it('renders the heading and description', () => {
        renderWidget();

        expect(screen.getByRole('heading', { name: 'Category budgets' })).toBeInTheDocument();
        expect(screen.getByText('Monthly spending limits')).toBeInTheDocument();
    });

    it('renders each budget category with its spent amount and limit', () => {
        renderWidget();

        expect(screen.getByText('Groceries')).toBeInTheDocument();
        expect(screen.getByText('Housing')).toBeInTheDocument();

        expect(screen.getByText('€250.00 / €500.00')).toBeInTheDocument();
        expect(screen.getByText('€800.00 / €800.00')).toBeInTheDocument();
    });

    it('displays the rounded percentage used for each category', () => {
        renderWidget();

        expect(screen.getByText('50% used')).toBeInTheDocument();
        expect(screen.getByText('100% used')).toBeInTheDocument();
    });

    it('displays the overspend amount and red styling when over budget', () => {
        useFetch
            .mockReset()
            .mockReturnValueOnce({
                data: [{ category: 'Groceries', limit: 200 }]
            })
            .mockReturnValueOnce({
                data: [{ category: 'Groceries', amount: 250, type: 'expense' }]
            });

        renderWidget();

        expect(screen.getByText('€50.00 over budget')).toBeInTheDocument();
        expect(screen.getByText('€50.00 over budget')).toHaveClass('text-red-400');
    });

    it('caps the progress bar width at 100% when over budget', () => {
        useFetch
            .mockReset()
            .mockReturnValueOnce({
                data: [{ category: 'Groceries', limit: 200 }]
            })
            .mockReturnValueOnce({
                data: [{ category: 'Groceries', amount: 250, type: 'expense' }]
            });

        const { container } = renderWidget();

        const progressBar = container.querySelector('.h-full');

        expect(progressBar).toHaveStyle({ width: '100%' });
        expect(progressBar).toHaveStyle({ backgroundColor: '#F87171' });
    });

    it('handles a zero budget limit without displaying an invalid percentage', () => {
        useFetch
            .mockReset()
            .mockReturnValueOnce({
                data: [{ category: 'Groceries', limit: 0 }]
            })
            .mockReturnValueOnce({
                data: [{ category: 'Groceries', amount: 50, type: 'expense' }]
            });

        renderWidget();

        expect(screen.getByText('0% used')).toBeInTheDocument();
        expect(screen.queryByText(/NaN|Infinity/)).not.toBeInTheDocument();
    });

    it('passes budgets and remaining budget to the parent callbacks', async () => {
        renderWidget();

        await waitFor(() => {
            expect(setBudgets).toHaveBeenCalledWith(budgets);
            expect(setRemainingBudget).toHaveBeenCalledWith(expect.any(Number));
        });
    });

    it('renders when parent callbacks are omitted', () => {
        renderWidget({
            setBudgets: undefined,
            setRemainingBudget: undefined
        });

        expect(screen.getByRole('heading', { name: 'Category budgets' })).toBeInTheDocument();
    });

    it('requests budgets and transactions for the current user and month', () => {
        renderWidget({ refreshKey: 7 });

        const [budgetsCall, transactionsCall] = useFetch.mock.calls;

        expect(budgetsCall[0]).toEqual([]);
        expect(budgetsCall[1]).toMatch(/^data\/budgets\?/);
        expect(budgetsCall[3]).toBe(7);

        expect(transactionsCall[0]).toEqual([]);
        expect(transactionsCall[1]).toMatch(/^data\/transactions\?/);
        expect(transactionsCall[1]).toContain('type%3D%22expense%22');
        expect(transactionsCall[3]).toBe(7);
    });
});