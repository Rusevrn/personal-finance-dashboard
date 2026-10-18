import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import BudgetCategoryWidget from './BudgetCategoryWidget';
import UserContext from '../../context/UserContext';


afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
});

test('displays a budget category and its spending percentage', async () => {
    const budgets = [
        { category: 'Groceries', limit: 300 },
    ];

    const transactions = [
        { category: 'Groceries', amount: 120 },
    ];

    vi.stubGlobal('fetch', vi.fn((url) => {
        const result = String(url).includes('/data/budgets')
            ? budgets
            : transactions;

        return Promise.resolve({
            json: () => Promise.resolve(result),
        });
    }));

    render(
        <UserContext.Provider value={{ user: { _id: 'test-user' } }}>
            <BudgetCategoryWidget />
        </UserContext.Provider>
    );

    expect(await screen.findByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('40% used')).toBeInTheDocument();
    expect(screen.getByText(/€120\.00\s*\/\s*€300\.00/)).toBeInTheDocument();
});

test('shows the overspent amount and caps the progress bar at 100%', async () => {
    const budgets = [
        { category: 'Groceries', limit: 300 },
    ];

    const transactions = [
        { category: 'Groceries', amount: 350 },
    ];

    vi.stubGlobal('fetch', vi.fn((url) => {
        const result = String(url).includes('/data/budgets')
            ? budgets
            : transactions;

        return Promise.resolve({
            json: () => Promise.resolve(result),
        });
    }));

    render(
        <UserContext.Provider value={{ user: { _id: 'test-user' } }}>
            <BudgetCategoryWidget />
        </UserContext.Provider>
    );

    expect(
        await screen.findByText('€50.00 over budget')
    ).toBeInTheDocument();

    const progressBar = screen
        .getByText('€50.00 over budget')
        .previousElementSibling
        .firstElementChild;

    expect(progressBar).toHaveStyle({ width: '100%' });
    expect(progressBar).toHaveStyle({ backgroundColor: '#F87171' });

    expect(screen.queryByText('117% used')).not.toBeInTheDocument();
});