import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import useForm from './useForm';

describe('useForm', () => {
    const initialValues = {
        description: '',
        amount: '',
    };

    const requiredFields = ['description', 'amount'];

    afterEach(() => {
        cleanup();
    });

    it('initializes form state correctly', () => {
        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, vi.fn()),
        );

        expect(result.current.values).toEqual(initialValues);
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.submitted).toBe(false);
    });

    it('returns the correct props for an input', () => {
        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, vi.fn()),
        );

        const props = result.current.getInputProps('description');

        expect(props).toEqual({
            name: 'description',
            value: '',
            onChange: result.current.changeHandler,
            onBlur: result.current.validationHandler,
        });
    });

    it('updates the changed field without overwriting other values', () => {
        const { result } = renderHook(() =>
            useForm(
                { description: 'Groceries', amount: '25' },
                requiredFields,
                vi.fn(),
            ),
        );

        act(() => {
            result.current.changeHandler({
                target: { name: 'amount', value: '40' },
            });
        });

        expect(result.current.values).toEqual({
            description: 'Groceries',
            amount: '40',
        });
    });

    it('marks a field as touched and validates on blur', () => {
        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, vi.fn()),
        );

        act(() => {
            result.current.validationHandler({
                target: { name: 'description' },
            });
        });

        expect(result.current.touched).toEqual({ description: true });
        expect(result.current.errors).toEqual({
            description: 'description is required.',
            amount: 'amount is required.',
        });
    });

    it('does not submit when validation fails', async () => {
        const onSubmit = vi.fn();

        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, onSubmit),
        );

        await act(async () => {
            await result.current.submitAction();
        });

        expect(onSubmit).not.toHaveBeenCalled();
        expect(result.current.submitted).toBe(true);
        expect(result.current.errors).toEqual({
            description: 'description is required.',
            amount: 'amount is required.',
        });
    });

    it('submits valid values and resets after success', async () => {
        const onSubmit = vi.fn().mockResolvedValue(undefined);
        const validValues = {
            description: 'Groceries',
            amount: '25',
        };

        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, onSubmit),
        );

        act(() => {
            result.current.setValues(validValues);
        });

        await act(async () => {
            await result.current.submitAction();
        });

        expect(onSubmit).toHaveBeenCalledWith(validValues);
        expect(result.current.values).toEqual(initialValues);
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.submitted).toBe(false);
    });

    it('does not reset the form when submission rejects', async () => {
        const onSubmit = vi.fn().mockRejectedValue(new Error('Request failed'));
        const validValues = {
            description: 'Groceries',
            amount: '25',
        };

        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, onSubmit),
        );

        act(() => {
            result.current.setValues(validValues);
        });

        await act(async () => {
            await expect(result.current.submitAction()).rejects.toThrow(
                'Request failed',
            );
        });

        expect(result.current.values).toEqual(validValues);
    });

    it('resets values and all form state when resetForm is called', () => {
        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, vi.fn()),
        );

        act(() => {
            result.current.setValues({
                description: 'Groceries',
                amount: '25',
            });
            result.current.validationHandler({
                target: { name: 'description' },
            });
        });

        act(() => {
            result.current.resetForm();
        });

        expect(result.current.values).toEqual(initialValues);
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.submitted).toBe(false);
    });

    it('does not mark a field as touched during submit validation', async () => {
        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, vi.fn()),
        );

        await act(async () => {
            await result.current.submitAction();
        });

        expect(result.current.touched).toEqual({});
        expect(result.current.submitted).toBe(true);
    });

    it('validates using the latest values after an input change', () => {
        const { result } = renderHook(() =>
            useForm(initialValues, requiredFields, vi.fn()),
        );

        act(() => {
            result.current.changeHandler({
                target: { name: 'description', value: 'Groceries' },
            });
        });

        act(() => {
            result.current.validationHandler({
                target: { name: 'description' },
            });
        });

        expect(result.current.errors).toEqual({
            amount: 'amount is required.',
        });
    });

});