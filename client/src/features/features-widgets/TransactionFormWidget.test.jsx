
import { cleanup, configure, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useParams } from 'react-router';
import TransactionFormWidget from './TransactionFormWidget';
import UserContext from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';

vi.mock('react-router', () => ({
    useParams: vi.fn(),
}));

vi.mock('../../hooks/useFetch', () => ({
    default: vi.fn(),
}));

vi.mock('../../components/app-components/widgets/DashWidget', () => ({
    default: ({ children }) => <div>{children}</div>,
}));

// Keep query errors concise without printing the entire DOM.
configure({
    getElementError: (message) => new Error(message ?? 'Element query failed'),
});

describe('TransactionFormWidget', () => {
    let request;
    let balanceUpdate;
    let onTransactionCreated;

    const user = {
        accessToken: 'test-token',
        balance: 1000,
    };

    const renderWidget = (props = {}, currentUser = user) =>
        render(
            <UserContext.Provider value={{ user: currentUser, balanceUpdate }}>
                <TransactionFormWidget
                    onTransactionCreated={onTransactionCreated}
                    {...props}
                />
            </UserContext.Provider>
        );

    const fillValidForm = (category = 'Salary', amount = '50') => {
        fireEvent.change(screen.getByLabelText('Amount (€)'), {
            target: { value: amount },
        });

        fireEvent.change(screen.getByLabelText('Category'), {
            target: { value: category },
        });

        fireEvent.change(screen.getByLabelText('Date'), {
            target: { value: '2026-10-15' },
        });
    };

    const submitForm = () => {
        fireEvent.click(screen.getByRole('button', { name: /add transaction/i }));
    };

    beforeEach(() => {
        vi.clearAllMocks();

        request = vi.fn().mockResolvedValue({});
        balanceUpdate = vi.fn().mockResolvedValue(undefined);
        onTransactionCreated = vi.fn();

        useParams.mockReturnValue({});
        useFetch.mockReturnValue({ request });

        // Expected failures are tested through assertions, not console noise.
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('defaults to income when no section or transaction type is provided', () => {
        renderWidget();

        expect(screen.getByRole('heading', { name: 'Add Income' })).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Expense' })).toBeTruthy();
    });

    it('initializes as an expense when the route section is expenses', () => {
        useParams.mockReturnValue({ section: 'expenses' });

        renderWidget();

        expect(screen.getByRole('heading', { name: 'Add Expense' })).toBeTruthy();
        expect(screen.queryByRole('button', { name: 'Income' })).toBeNull();
        expect(screen.getByRole('option', { name: 'Groceries' })).toBeTruthy();
    });

    it('toggles between income and expense when no route section is set', () => {
        renderWidget();

        fireEvent.click(screen.getByRole('button', { name: 'Expense' }));

        expect(screen.getByRole('heading', { name: 'Add Expense' })).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Income' })).toBeTruthy();
        expect(screen.getByRole('option', { name: 'Groceries' })).toBeTruthy();

        fireEvent.click(screen.getByRole('button', { name: 'Income' }));

        expect(screen.getByRole('heading', { name: 'Add Income' })).toBeTruthy();
        expect(screen.getByRole('option', { name: 'Salary' })).toBeTruthy();
    });

    it('submits income with a numeric amount and derived month', async () => {
        renderWidget();
        fillValidForm('Salary', '50.75');
        submitForm();

        await waitFor(() => {
            expect(request).toHaveBeenCalledWith('data/transactions', {
                method: 'POST',
                payload: {
                    merchant: '',
                    amount: 50.75,
                    type: 'income',
                    date: '2026-10-15',
                    month: '2026-10',
                    category: 'Salary',
                },
                auth: 'test-token',
            });
        });

        expect(balanceUpdate).toHaveBeenCalledWith('50.75', 'income');
        expect(onTransactionCreated).toHaveBeenCalledWith(expect.any(Function));

        const updateTransactionCount = onTransactionCreated.mock.calls[0][0];
        expect(updateTransactionCount(3)).toBe(4);
    });

    it('submits an expense and updates the balance', async () => {
        useParams.mockReturnValue({ section: 'expenses' });

        renderWidget();
        fillValidForm('Groceries', '75');
        submitForm();

        await waitFor(() => {
            expect(request).toHaveBeenCalledWith('data/transactions', {
                method: 'POST',
                payload: {
                    merchant: '',
                    amount: 75,
                    type: 'expense',
                    date: '2026-10-15',
                    month: '2026-10',
                    category: 'Groceries',
                },
                auth: 'test-token',
            });
        });

        await waitFor(() => {
            expect(balanceUpdate).toHaveBeenCalledWith('75', 'expense');
            expect(onTransactionCreated).toHaveBeenCalledTimes(1);
        });
    });

    it('does not submit an expense that exceeds the available balance', async () => {
        useParams.mockReturnValue({ section: 'expenses' });

        renderWidget({}, { ...user, balance: 40 });
        fillValidForm('Groceries', '50');
        submitForm();

        await waitFor(() => {
            expect(balanceUpdate).not.toHaveBeenCalled();
            expect(onTransactionCreated).not.toHaveBeenCalled();
        });

        expect(request).not.toHaveBeenCalled();
    });

    it('does not update the balance or refresh transactions if creation fails', async () => {
        request.mockRejectedValue(new Error('Server error'));

        renderWidget();
        fillValidForm('Salary', '50');
        submitForm();

        await waitFor(() => {
            expect(request).toHaveBeenCalledTimes(1);
        });

        expect(balanceUpdate).not.toHaveBeenCalled();
        expect(onTransactionCreated).not.toHaveBeenCalled();
    });

    it('refreshes transactions even if the balance update fails after saving', async () => {
        balanceUpdate.mockRejectedValue(new Error('Balance update failed'));

        renderWidget();
        fillValidForm('Salary', '50');
        submitForm();

        await waitFor(() => {
            expect(balanceUpdate).toHaveBeenCalledWith('50', 'income');
            expect(onTransactionCreated).toHaveBeenCalledTimes(1);
        });

        expect(request).toHaveBeenCalledTimes(1);
    });

    it('does not create a transaction when required fields are missing', async () => {
        renderWidget();
        submitForm();

        await waitFor(() => {
            expect(screen.getByLabelText('Amount (€)')).toBeTruthy();
        });

        expect(request).not.toHaveBeenCalled();
        expect(balanceUpdate).not.toHaveBeenCalled();
        expect(onTransactionCreated).not.toHaveBeenCalled();
    });
});
