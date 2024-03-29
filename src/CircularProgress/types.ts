import * as React from 'react';
import { BoxProps } from '../Box/types';

type ICircularProgress = {
    /**
     * The size of the circular progress in CSS units
     */
    size?: string;
    /**
     * Maximum value defining 100% progress made (must be higher than 'min')
     */
    max?: number;
    /**
     * Minimum value defining 'no progress' (must be lower than 'max')
     */
    min?: number;
    /**
     * Puts the component into 'indeterminate' state; Ignores 'value' prop
     */
    isIndeterminate?: boolean;
    /**
     * The thickness of progress indicator as a ratio of `size`. Must be between `0` and `1`
     */
    thickness?: number;
    /**
     * Current progress (must be between min/max)
     */
    value?: number;
    /**
     * Angle to rotate progress indicator by
     */
    angle?: number;
    /**
     * If `true`, the cap of the progress indicator will be rounded.
     */
    capIsRound?: boolean;
    /**
     * The content of the circular progress bar. If passed, the content will be inside and centered in the progress bar.
     */
    children?: React.ReactNode;
    /**
     * The color name of the progress track. Use a color key in the theme object, i.e. "blue.500"
     * Defaults to theme variable color: "track"
     */
    trackColor?: string;
    /**
     * The color of the progress indicator. Use a color key in the theme object, i.e. "gray.100"
     * Defaults to theme variable color: "progress"
     */
    color?: string;
};

export type CircularProgressProps = BoxProps & ICircularProgress;

export type CircularProgressLabelProps = BoxProps;
