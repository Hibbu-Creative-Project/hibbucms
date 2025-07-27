import { Link } from '@inertiajs/react';
import { type PropsWithChildren, useState, useEffect, useMemo } from 'react';
import { useAppearance } from '@/contexts/appearance-context';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { appearance } = useAppearance();
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
     * Force re-render when theme changes
     */
    useEffect(() => {
        setLogoKey(prev => prev + 1);
    }, [appearance]);

    /**
     * Get the appropriate logo source based on theme
     */
    const getLogoSrc = () => {
        return isDark ? '/logo-icon-dark.svg' : '/logo-icon.svg';
    };

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-24 w-auto items-center justify-center rounded-md">
                                <img
                                    key={logoKey}
                                    src={getLogoSrc()}
                                    alt="Hibbu CMS Icon"
                                    className="h-24 w-auto text-white"
                                    onError={(e) => {
                                        // Fallback to original logo if dark mode variant doesn't exist
                                        const target = e.target as HTMLImageElement;
                                        if (isDark) {
                                            target.src = '/logo-icon.svg';
                                        }
                                    }}
                                />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
