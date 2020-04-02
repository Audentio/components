/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    RefObject,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import Box from '../Box';
import { RadioGroupProps } from './types';

export const RadioGroup = forwardRef(
    (
        {
            onChange,
            name,
            variantColor,
            size,
            defaultValue,
            isInline,
            value: valueProp,
            spacing = 2,
            children,
            ...rest
        }: RadioGroupProps,
        ref
    ) => {
        const { current: isControlled } = useRef(valueProp != null);
        const [value, setValue] = useState(defaultValue || null);
        const _value = isControlled ? valueProp : value;

        const rootRef: RefObject<any> = useRef();

        const _onChange = event => {
            if (!isControlled) {
                setValue(event.target.value);
            }

            if (onChange) {
                onChange(event, event.target.value);
            }
        };

        // If no name is passed, we'll generate a random, unique name
        const fallbackName = `radio-${useId()}`;
        const _name = name || fallbackName;

        const clones = Children.map(children, (child, index) => {
            if (!isValidElement(child)) {
                return null;
            }

            const isLastRadio = children.length === index + 1;
            const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

            return (
                <Box display={isInline ? 'inline-block' : 'block'} {...(!isLastRadio && spacingProps)}>
                    {cloneElement(child, {
                        size: child.props.size || size,
                        variantColor: child.props.variantColor || variantColor,
                        name: _name,
                        onChange: _onChange,
                        isChecked: child.props.value === _value,
                    })}
                </Box>
            );
        });

        // Calling focus() on the radiogroup should focus on the selected option or first enabled option
        useImperativeHandle(
            ref,
            () => ({
                focus: () => {
                    let input = rootRef.current.querySelector('input:not(:disabled):checked');

                    if (!input) {
                        input = rootRef.current.querySelector('input:not(:disabled)');
                    }

                    if (input) {
                        input.focus();
                    }
                },
            }),
            []
        );

        return (
            <Box ref={rootRef} role="radiogroup" {...rest}>
                {clones}
            </Box>
        );
    }
);