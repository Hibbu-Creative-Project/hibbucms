import { useSidebar } from '@/components/ui/sidebar';
import { useAppearance } from '@/contexts/appearance-context';
import { useState, useEffect, useMemo } from 'react';

/**
 * AppLogo component that displays different logos based on sidebar state and theme
 * Shows full logo when expanded and icon only when collapsed
 * Supports dark mode with appropriate logo variants
 */
export default function AppLogo() {
    const { state } = useSidebar();
    const { appearance } = useAppearance();
    const isCollapsed = state === 'collapsed';

    const [logoKey, setLogoKey] = useState(0);

    /**
     * Determine if current theme is dark
     */
    const isDark = useMemo(() => {
        if (appearance === 'dark') return true;
        if (appearance === 'light') return false;
        // For system preference
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }, [appearance]);

    /**
     * Force re-render when theme or collapsed state changes
     */
    useEffect(() => {
        setLogoKey(prev => prev + 1);
    }, [appearance, isCollapsed]);

    /**
     * Get the appropriate logo source based on theme and collapsed state
     */
    const getLogoSrc = () => {
        if (isCollapsed) {
            return isDark ? '/logo-icon-dark.svg' : '/logo-icon.svg';
        }
        return isDark ? '/logo-dark.svg' : '/logo.svg';
    };

    /**
     * Get the appropriate alt text based on collapsed state
     */
    const getAltText = () => {
        return isCollapsed ? 'Hibbu CMS Icon' : 'Hibbu CMS Logo';
    };

    return (
        <>
            <img
                key={logoKey}
                src={getLogoSrc()}
                alt={getAltText()}
                className="h-42 w-auto text-white transition-opacity duration-200"
                onError={(e) => {
                    // Fallback to original logo if dark mode variant doesn't exist
                    const target = e.target as HTMLImageElement;
                    if (isDark) {
                        target.src = isCollapsed ? '/logo-icon.svg' : '/logo.svg';
                    }
                }}
            />
        </>
    );
}
