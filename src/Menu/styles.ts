import { keyframes } from '@emotion/react';
import { useTheme } from '../ThemeProvider';

const fadeIn = keyframes`
  from, 0%, to {
    opacity: 0%;
  }

  100% {
    opacity: 100%;
  }
`

export const menuStyle = (props, theme) => ({
    style: {
        color: 'inherit',
        borderWidth: '1px',
        borderColor: 'border',
        bg: 'popoverBg',
        fontSize: 'body',
        shadow: 'menu',
        py: 2,
        minW: '3xs',
        rounded: 'md',
        tabIndex: 1,
        zIndex: 'popover',
        animation: `${fadeIn} ease-in .2s`,
        _focus: { outline: 0 },
        maxHeight: "400px",
        overflowY: 'auto',
    },
});

export const useMenuStyle = props => {
    const theme = useTheme();

    const styles = theme['styles'].menu ? theme['styles'].menu(props, theme) : menuStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

/**
|--------------------------------------------------
| Styles for MenuItem
|--------------------------------------------------
*/

export const menuItemStyle = (props, theme) => ({
    style: {
        display: 'flex',
        textDecoration: 'none',
        color: 'inherit',
        minHeight: '32px',
        alignItems: 'center',
        textAlign: 'left',
        outline: 'none',
        px: 4,
        width: 'full',
        flex: ' 0 0 auto',
        userSelect: 'none',
        transition: 'background-color 220ms, color 220ms',
        _active: {
            bg: 'selectControlHover',
        },
        _focus: {
            bg: 'selectControlHover',
            outline: 0,
        },
        _disabled: {
            opacity: 0.4,
            cursor: 'not-allowed',
        },
    },
});

export const useMenuItemStyle = props => {
    const theme = useTheme();

    const styles = theme['styles'].menuItem ? theme['styles'].menuItem(props, theme) : menuItemStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};
