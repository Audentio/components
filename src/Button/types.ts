import { MdiReactIconComponentType } from 'mdi-react';
import * as React from 'react';
import { Omit } from '../common-types';
import { PseudoBoxProps } from '../PseudoBox';
import { Icons } from '../theme/icons';

export interface IButton {
    /**
     * The size of the button
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * If `true`, the button will show a spinner.
     */
    isLoading?: boolean;
    /**
     * The color scheme of the button.
     *
     * 🚨Note: This should be one of the color keys in the theme that has `100` - `900` color values (e.g.`green`, `red`).
     * @see http://chakra-ui.com/theme#colors
     */
    variantColor?: string;
    /**
     * The variant of the button style to use.
     */
    variant?: 'primary' | 'secondary' | 'tertiary';
    /**
     * If `true`, the button will be disabled.
     */
    isDisabled?: boolean;
    /**
     * The label to show in the button when `isLoading` is true
     * If no text is passed, it only shows the spinner
     */
    loadingText?: string;
    /**
     * If `true`, the button will take up the full width of its container.
     */
    isFullWidth?: boolean;
    /**
     * The html button type to use.
     */
    type?: 'button' | 'reset' | 'submit';
    /**
     * The content of the button.
     */
    children?: React.ReactNode;
    /**
     * If added, the button will show an icon before the button's label.
     * Use the icon key in `theme.iconPath` or an icon from mdi-react.
     */
    leftIcon?: Icons | MdiReactIconComponentType;
    /**
     * If added, the button will show an icon after the button's label.
     * Use the icon key in `theme.iconPath` or an icon from mdi-react.
     */
    rightIcon?: Icons | MdiReactIconComponentType;
    /**
     * The space between the button icon and label.
     * Use the styled-system tokens or add custom values as a string
     */
    iconSpacing?: PseudoBoxProps['margin'];

    iconOnly?: boolean;
}

export type ButtonProps = IButton & Omit<PseudoBoxProps, 'size'>;