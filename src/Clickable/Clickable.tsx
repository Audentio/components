import { isExternalUrl } from '@audentio/utils/lib/isExternalUrl';
import React from 'react';
import { Box } from '../Box';
import { useRouter } from '../utils/router';
import { ClickableProps } from './types';

export const Clickable = ({ onClick, href, as, staticContext, innerRef, ...props }: ClickableProps) => {
    const { router } = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
        if (onClick) {
            onClick(e);
        }

        if (!href) return;

        const target = e.target as HTMLAnchorElement;

        if (
            // not anchor
            !target.href &&
            !(target.parentNode as HTMLAnchorElement).href &&
            // not button
            target.nodeName !== 'BUTTON' &&
            target.parentNode.nodeName !== 'BUTTON'
        ) {
            const isExternal = isExternalUrl(href);

            if (e.metaKey && !isExternal) {
                // cmd+click internal link – open in new tab
                window.open(window.location.origin + href, '_blank');
            } else if (isExternal) {
                // external link always open in new tab
                window.open(href, '_blank');
            } else {
                // internal link
                // push to history
                router.push(href);
            }
        }

        // don't do anything if a nested anchor or button was clicked
    };
    return <Box as={as} onClick={handleClick} ref={innerRef} cursor={(href || onClick) && 'pointer'} {...props} />;
};
