import type { Config } from 'ziggy-js';
import type { Auth } from './index';

declare interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type { SharedData };
