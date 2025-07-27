import { useEffect, useState } from 'react';

/**
 * Custom hook for managing application appearance/theme
 * Supports light, dark, and system themes
 */
export function useAppearance() {
    const [appearance, setAppearance] = useState<'light' | 'dark' | 'system'>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    /**
     * Get the current appearance from cookie or default to system
     */
    const getAppearanceFromCookie = (): 'light' | 'dark' | 'system' => {
        const cookies = document.cookie.split(';');
        const appearanceCookie = cookies.find(cookie => 
            cookie.trim().startsWith('appearance=')
        );
        
        if (appearanceCookie) {
            const value = appearanceCookie.split('=')[1] as 'light' | 'dark' | 'system';
            return ['light', 'dark', 'system'].includes(value) ? value : 'system';
        }
        
        return 'system';
    };

    /**
     * Set appearance cookie
     */
    const setAppearanceCookie = (theme: 'light' | 'dark' | 'system') => {
        document.cookie = `appearance=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
    };

    /**
     * Get system preference
     */
    const getSystemTheme = (): 'light' | 'dark' => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    };

    /**
     * Resolve the actual theme based on appearance setting
     */
    const resolveTheme = (appearanceSetting: 'light' | 'dark' | 'system'): 'light' | 'dark' => {
        if (appearanceSetting === 'system') {
            return getSystemTheme();
        }
        return appearanceSetting;
    };

    /**
     * Apply theme to document
     */
    const applyTheme = (theme: 'light' | 'dark') => {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    /**
     * Update appearance setting
     */
    const updateAppearance = (newAppearance: 'light' | 'dark' | 'system') => {
        setAppearance(newAppearance);
        setAppearanceCookie(newAppearance);
        
        const resolved = resolveTheme(newAppearance);
        setResolvedTheme(resolved);
        applyTheme(resolved);
    };

    // Initialize appearance on mount
    useEffect(() => {
        const initialAppearance = getAppearanceFromCookie();
        setAppearance(initialAppearance);
        
        const resolved = resolveTheme(initialAppearance);
        setResolvedTheme(resolved);
        applyTheme(resolved);
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            const handleChange = () => {
                if (appearance === 'system') {
                    const resolved = getSystemTheme();
                    setResolvedTheme(resolved);
                    applyTheme(resolved);
                }
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [appearance]);

    return {
        appearance,
        resolvedTheme,
        updateAppearance,
        isDark: resolvedTheme === 'dark',
        isLight: resolvedTheme === 'light',
    };
}