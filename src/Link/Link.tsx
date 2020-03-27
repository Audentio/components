import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { LinkProps } from './types';

const baseStyleProps = {
    transition: `all 0.15s ease-out`,
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'bodyText',
    _hover: { textDecoration: 'underline' },
    _focus: {
        boxShadow: 'outline',
    },
    _disabled: {
        opacity: '0.4',
        cursor: 'not-allowed',
        textDecoration: 'none',
    },
};

const Link = forwardRef(({ isDisabled, isExternal, onClick, ...rest }: LinkProps, ref) => {
    const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : null;

    return (
        <PseudoBox
            as="a"
            ref={ref}
            tabIndex={isDisabled ? -1 : undefined}
            aria-disabled={isDisabled}
            onClick={isDisabled ? event => event.preventDefault() : onClick}
            {...externalProps}
            {...baseStyleProps}
            {...rest}
        />
    );
});

Link.displayName = 'Link';

export default Link;