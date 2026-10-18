import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, renderHook, act } from '@testing-library/react';
import useLocalState from './useLocalState';

afterEach(() => {
    cleanup();
    localStorage.clear();
});

test('uses initialState when localStorage has no saved value', () => {
    const initialState = { name: 'Guest' };

    const { result } = renderHook(() =>
        useLocalState(initialState, 'user')
    );

    expect(result.current.state).toEqual(initialState);
});

test('restores state from localStorage', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Peter' }));

    const { result } = renderHook(() =>
        useLocalState({}, 'user')
    );

    expect(result.current.state).toEqual({ name: 'Peter' });
});

test('updates state and persists the new value', () => {
    const { result } = renderHook(() =>
        useLocalState(0, 'count')
    );

    act(() => {
        result.current.setLocalState(5);
    });

    expect(result.current.state).toBe(5);
    expect(localStorage.getItem('count')).toBe('5');
});

test('supports functional state updates', () => {
    const { result } = renderHook(() =>
        useLocalState(10, 'count')
    );

    act(() => {
        result.current.setLocalState(prev => prev + 5);
    });

    expect(result.current.state).toBe(15);
    expect(JSON.parse(localStorage.getItem('count'))).toBe(15);
});

test('resets state and removes its localStorage entry', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Peter' }));

    const { result } = renderHook(() =>
        useLocalState({}, 'user')
    );

    act(() => {
        result.current.clearLocalStorage();
    });

    expect(result.current.state).toEqual({});
    expect(localStorage.getItem('user')).toBeNull();
});