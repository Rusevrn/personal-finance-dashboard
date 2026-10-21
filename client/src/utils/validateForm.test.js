import { describe, expect, it } from 'vitest';
import validateForm from './validateForm';

describe('validateForm', () => {
    it('returns no errors when all required fields are valid', () => {
        const formData = {
            description: 'Groceries',
            amount: '25.50',
            date: '2026-10-21',
        };

        expect(validateForm(formData, ['description', 'amount', 'date'])).toEqual({});
    });

    it('returns an error for each missing required field', () => {
        const formData = {
            description: '',
            amount: '',
            date: '',
        };

        expect(validateForm(formData, ['description', 'amount', 'date'])).toEqual({
            description: 'description is required.',
            amount: 'amount is required.',
            date: 'date is required.',
        });
    });

    it('treats whitespace-only strings as missing', () => {
        expect(validateForm({ description: '   ' }, ['description'])).toEqual({
            description: 'description is required.',
        });
    });

    it('treats nullish or missing required fields as missing', () => {
        expect(validateForm({}, ['description', 'date'])).toEqual({
            description: 'description is required.',
            date: 'date is required.',
        });

        expect(validateForm({ description: null }, ['description'])).toEqual({
            description: 'description is required.',
        });
    });

    it.each([
        ['zero', '0'],
        ['negative numbers', '-10'],
        ['non-numeric strings', 'abc'],
        ['infinity', 'Infinity'],
        ['NaN', 'NaN'],
    ])('rejects %s as an amount', (_description, amount) => {
        expect(validateForm({ amount }, ['amount'])).toEqual({
            amount: 'Amount must be a positive number.',
        });
    });

    it('treats an empty amount as required', () => {
        expect(validateForm({ amount: '' }, ['amount'])).toEqual({
            amount: 'amount is required.',
        });
    });

    it('returns the numeric validation error for non-empty invalid amounts', () => {
        expect(validateForm({ amount: 'abc' }, ['amount'])).toEqual({
            amount: 'Amount must be a positive number.',
        });
    });

    it.each([
        ['positive integers', '25'],
        ['positive decimals', '25.50'],
        ['decimal values below one', '0.01'],
    ])('accepts %s', (_description, amount) => {
        expect(validateForm({ amount }, ['amount'])).toEqual({});
    });

    it('does not validate amount when it is not a required field', () => {
        expect(
            validateForm(
                { description: 'Groceries', amount: '-10' },
                ['description'],
            ),
        ).toEqual({});
    });

    it('returns no errors when there are no required fields', () => {
        expect(validateForm({}, [])).toEqual({});
    });

});