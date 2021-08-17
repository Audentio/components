import React from 'react';
import { Box } from '../Box';
import { useHasImageLoaded } from '../Image';
import useAvatarStyle, { useAvatarBadgeStyle } from './styles';
import { AvatarBadgeProps, AvatarNameProps, AvatarProps } from './types';

export const AvatarBadge = (props: AvatarBadgeProps) => {
    const avatarBadgeProps = useAvatarBadgeStyle({
        color: props.color,
        borderColor: props.borderColor,
    });

    return <Box {...avatarBadgeProps} {...props} />;
};

const getInitials = (name) => {
    const [firstName, lastName] = name.split(' ');

    if (firstName && lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    }

    return firstName.charAt(0);
};

const truncateName = (name) => {
    if (name && name.length > 3) {
        return `${name.charAt(0)}${name.charAt(1)}${name.charAt(2)}`;
    } else {
        return name;
    }
};

const AvatarName = ({ name, useExact, ...props }: AvatarNameProps) => {
    return (
        <Box
            textAlign="center"
            fontSize={name.length > 2 && '.7em'}
            textTransform="uppercase"
            fontWeight="medium"
            aria-label={name}
            {...props}
        >
            {name && !useExact ? getInitials(name) : null}
            {name && useExact ? truncateName(name) : null}
        </Box>
    );
};

const DefaultAvatar = (props) => (
    <Box size="100%" {...props}>
        <svg fill="#fff" viewBox="0 0 128 128" role="img">
            <g>
                <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
                <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
            </g>
        </svg>
    </Box>
);

/**
 * The Avatar component is used to represent user, and displays the profile
 * picture, initials or fallback icon.
 */
export const Avatar = ({
    size = 'md',
    showBorder,
    name,
    src,
    useExact,
    borderColor,
    children,
    ...rest
}: AvatarProps) => {
    const avatarStyleProps = useAvatarStyle({
        name,
        size,
        showBorder,
        borderColor,
    });
    const hasLoaded = useHasImageLoaded({ src });

    const _size = null;

    const renderChildren = () => {
        if (src && hasLoaded) {
            return <Box as="img" size="100%" rounded="full" objectFit="cover" src={src} alt={name} />;
        }

        if (src && !hasLoaded) {
            if (name) {
                return <AvatarName useExact={useExact} size={_size} name={name} />;
            }
            return <DefaultAvatar aria-label={name} />;
        }

        if (!src && name) {
            return <AvatarName useExact={useExact} size={_size} name={name} />;
        }

        return <DefaultAvatar aria-label={name} />;
    };

    return (
        <Box {...avatarStyleProps} {...rest}>
            {renderChildren()}
            {children}
        </Box>
    );
};
