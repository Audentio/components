import React, { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';
import { ButtonGroupProps } from './types';

export const ButtonGroup = ({
    size,
    variantColor = 'button',
    variant,
    isAttached,
    children,
    ...rest
}: ButtonGroupProps) => {
    const clones = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            return null;
        }

        const isFirst = index === 0;
        const isLast = index === Children.count(children) - 1;

        return cloneElement(child, {
            size: size || child.props.size,
            variantColor: child.props.variantColor || variantColor,
            variant: child.props.variant || variant,
            my: 'spacing-xs',

            ...(!isLast && !isAttached && { mr: 'spacing-sm' }),
            ...(isFirst && isAttached && { roundedRight: 0 }),
            ...(isLast && isAttached && { roundedLeft: 0 }),
            ...(!isLast && isAttached && { borderRight: 0 }),
            ...(!isFirst && !isLast && isAttached && { rounded: 0 }),
        });
    });

    return (
        <Box display="inline-block" {...rest}>
            {clones}
        </Box>
    );
};
