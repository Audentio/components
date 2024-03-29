import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';

type Size = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface IAvatar {
    /**
     * The name of the person in the avatar.
     *
     * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
     * - If `src` is not loaded, the name will be used to create the initials
     */
    name?: string;
    /**
     * The size of the avatar.
     */
    size?: Size;
    /**
     * If `true`, the `Avatar` will show a border around it.
     *
     * Best for a group of avatars
     */
    showBorder?: boolean;
    /**
     * The badge at the bottom right corner of the avatar.
     */
    children?: React.ReactNode;
    /**
     * The image url of the `Avatar`
     */
    src?: string;
    useExact?: boolean;
}

export type AvatarProps = IAvatar & Omit<BoxProps, 'size'>;

interface IAvatarName {
    name?: string;
    useExact?: boolean;
}

export type AvatarNameProps = IAvatarName & BoxProps;

interface IAvatarBadge {
    borderColor?: string;
}

export type AvatarBadgeProps = IAvatarBadge & Omit<BoxProps, 'borderColor'>;
