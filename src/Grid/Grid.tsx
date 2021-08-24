import React, { forwardRef } from 'react';
import { FullGrid } from '../FullGrid';
import { GridProps } from './types';
import { countToColumns, widthToColumns } from './utils';

// A simplified version of <FullGrid> which can be used in most cases.

export const Grid = forwardRef(
    (
        {
            columns,
            spacingX = 'spacing',
            spacingY = 'spacing',
            spacing = 'spacing',
            minChildWidth,
            autoFill,
            ...props
        }: GridProps,
        ref
    ) => {
        const templateColumns = minChildWidth ? widthToColumns(minChildWidth, autoFill) : countToColumns(columns);

        return (
            <FullGrid
                ref={ref}
                gap={spacing}
                columnGap={spacing || spacingX}
                rowGap={spacing || spacingY}
                templateColumns={templateColumns}
                {...props}
            />
        );
    }
);
