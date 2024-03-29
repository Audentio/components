import React, { forwardRef, RefObject } from 'react';
import { Box } from '../Box';
import useCheckboxStyle from '../Checkbox/styles';
import { ControlBox } from '../ControlBox';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { RadioProps } from './types';

export const Radio = forwardRef(
    (
        {
            id,
            name,
            value,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            variantColor = 'primary',
            defaultIsChecked,
            isChecked,
            isFullWidth,
            size = 'md',
            isDisabled,
            isInvalid,
            onChange,
            renderCustomControl,
            onBlur,
            onFocus,
            children,
            ...rest
        }: RadioProps,
        ref: RefObject<HTMLInputElement>
    ) => {
        // Wrong usage of `variantColor` prop is quite common
        // Let's add a warning hook that validates the passed variantColor
        useVariantColorWarning('Radio', variantColor);

        const { root: rootStyleProps, label: labelStyleProps, container: containerStyleProps } = useCheckboxStyle({
            color: variantColor,
            size,
            type: 'radio',
        });

        return (
            <Box as="label" htmlFor={id} {...containerStyleProps} {...rest}>
                <VisuallyHidden
                    as="input"
                    type="radio"
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    id={name}
                    ref={ref}
                    name={name}
                    value={value}
                    aria-invalid={isInvalid}
                    defaultChecked={defaultIsChecked}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    checked={isChecked}
                    disabled={isDisabled}
                />
                {renderCustomControl ? (
                    renderCustomControl({ isChecked, type: 'radio', ...rootStyleProps })
                ) : (
                    <ControlBox {...rootStyleProps} type="radio" rounded="full">
                        <Box bg="currentColor" as="span" rounded="full" size="50%" />
                    </ControlBox>
                )}

                {children && <Text {...labelStyleProps}>{children}</Text>}
            </Box>
        );
    }
);
