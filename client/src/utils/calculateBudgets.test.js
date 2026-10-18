
import { describe, expect, test } from 'vitest';
import { calculateBudgets } from './calculateBudgets';

describe('calculateBudgets', () => {
    test('calculates spending for each budget category', () => {
        const budgets = [
            { category: 'Groceries', limit: 300 },
            { category: 'Transport', limit: 100 },
        ];

        const transactions = [
            { category: 'Groceries', amount: 80 },
            { category: 'Groceries', amount: 40 },
            { category: 'Transport', amount: 50 },
        ];

        const result = calculateBudgets(budgets, transactions);

        expect(result.budgetsWithSpent).toEqual([
            { category: 'Groceries', limit: 300, spent: 120 },
            { category: 'Transport', limit: 100, spent: 50 },
        ]);
        expect(result.remainingBudget).toBe(230);
    });

    test('does not count transactions from unrelated categories', () => {
        const budgets = [
            { category: 'Groceries', limit: 300 },
        ];

        const transactions = [
            { category: 'Groceries', amount: 75 },
            { category: 'Dining', amount: 60 },
        ];

        const result = calculateBudgets(budgets, transactions);

        expect(result.budgetsWithSpent[0].spent).toBe(75);
        expect(result.remainingBudget).toBe(225);
    });

    test('sets spending to zero when a budget has no matching transactions', () => {
        const budgets = [
            { category: 'Housing', limit: 500 },
        ];

        const transactions = [
            { category: 'Groceries', amount: 40 },
        ];

        const result = calculateBudgets(budgets, transactions);

        expect(result.budgetsWithSpent[0].spent).toBe(0);
        expect(result.remainingBudget).toBe(500);
    });

    test('allows a budget to be overspent', () => {
        const budgets = [
            { category: 'Transport', limit: 100 },
        ];

        const transactions = [
            { category: 'Transport', amount: 125 },
        ];

        const result = calculateBudgets(budgets, transactions);

        expect(result.budgetsWithSpent[0].spent).toBe(125);
        expect(result.remainingBudget).toBe(-25);
    });

    test('returns zero remaining budget when there are no budgets', () => {
        const result = calculateBudgets([], [
            { category: 'Groceries', amount: 80 },
        ]);

        expect(result.budgetsWithSpent).toEqual([]);
        expect(result.remainingBudget).toBe(0);
    });

    test('sets spending to zero for every budget when there are no transactions', () => {
        const budgets = [
            { category: 'Groceries', limit: 300 },
            { category: 'Transport', limit: 100 },
        ];

        const result = calculateBudgets(budgets, []);

        expect(result.budgetsWithSpent).toEqual([
            { category: 'Groceries', limit: 300, spent: 0 },
            { category: 'Transport', limit: 100, spent: 0 },
        ]);
        expect(result.remainingBudget).toBe(400);
    });

    test('does not mutate the input budgets or transactions', () => {
        const budgets = [
            { category: 'Groceries', limit: 300 },
        ];

        const transactions = [
            { category: 'Groceries', amount: 80 },
        ];

        const originalBudgets = structuredClone(budgets);
        const originalTransactions = structuredClone(transactions);

        calculateBudgets(budgets, transactions);

        expect(budgets).toEqual(originalBudgets);
        expect(transactions).toEqual(originalTransactions);
        expect(budgets[0]).not.toHaveProperty('spent');
    });
});