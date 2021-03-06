import * as React from 'react';
import { Position } from 'toasted-notes';
import { AlertProps, IAlert } from '../Alert/types';

export interface IToast extends IAlert {
    /**
     * The title of the toast.
     */
    title?: string;
    /**
     * If `true` adds a close button to the toast.
     */
    isClosable?: boolean;
    /**
     * Callback function to close the toast.
     */
    onClose?: () => void;
    /**
     * The description of the toast
     */
    description?: string;
    /**
     * Duration before dismiss in milliseconds, or `null` to never dismiss.
     */
    duration?: number | null;
    /**
     * One of toasted-notes positions.
     */
    position?: keyof typeof Position;
}

interface RenderOption {
    render?: (props: { onClose: () => void; id: string }) => React.ReactNode;
}
export type useToastOptions = IToast & RenderOption;

export type ToastProps = AlertProps & IToast;
