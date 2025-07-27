import { useSidebar } from '@/components/ui/sidebar';

/**
 * AppLogo component that displays different logos based on sidebar state
 * Shows full logo when expanded and icon only when collapsed
 */
export default function AppLogo() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
        <>
            {isCollapsed ? (
                <img
                    src="/logo-icon.svg"
                    alt="Hibbu CMS Icon"
                    className="h-12 w-auto text-white"
                />
            ) : (
                <img
                    src="/logo.svg"
                    alt="Hibbu CMS Logo"
                    className="h-42 w-auto text-white"
                />
            )}
        </>
    );
}
