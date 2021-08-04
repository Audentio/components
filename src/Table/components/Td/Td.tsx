import React from 'react';
import { Box } from '../../../Box';
import useTableStyle from '../../styles';
import { TableCellProps } from '../../types';

export const Td = (props: TableCellProps, ...rest) => {
    const { cell: cellStyleProps } = useTableStyle({
        span: props.span,
    });
    return (
        <Box as="td" {...cellStyleProps} {...props} {...rest}>
            {props.children}
        </Box>
    );
};
