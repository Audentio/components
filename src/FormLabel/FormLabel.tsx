/**
 * FormLabel is used for form inputs and controls.
 * It reads from the `FormControl` context to handle it's styles for
 * the various form states.
 */

import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { useFormControl } from '../FormControl';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import useFormLabelStyle from './styles';
import { FormLabelProps } from './types';

export const RequiredIndicator = (props) => {
    const { requiredIndicator: requiredIndicatorStyleProps } = useFormLabelStyle({});
    return (
        <Box as="span" aria-hidden="true" {...requiredIndicatorStyleProps} {...props}>
            *
        </Box>
    );
};

export const FormLabel = forwardRef(({ children, tooltip, tooltipTitle, ...props }: FormLabelProps, ref) => {
    const formControl = useFormControl(props);

    const { root: formLabelStyleProps } = useFormLabelStyle({
        isDisabled: formControl.isDisabled,
    });

    return (
        <Flex align="center" gridGap="spacing-sm" pb="spacing-sm" pr="spacing-sm">
            <Text ref={ref} as="label" {...formLabelStyleProps} {...props}>
                {children}
                {formControl.isRequired && <RequiredIndicator />}
            </Text>
            {tooltip && (
                <Box pos="relative" lineHeight="1">
                    <Tooltip label={tooltip} shouldWrapChildren>
                        <Icon
                            d="inline-block"
                            title={tooltipTitle && tooltipTitle}
                            name="info"
                            size="18px"
                            viewBox="0 0 24 24"
                        />
                    </Tooltip>
                </Box>
            )}
        </Flex>
    );
});
