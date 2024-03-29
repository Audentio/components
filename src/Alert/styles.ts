import { addOpacity } from '../theme/colors-utils';
import { useTheme } from '../ThemeProvider';

export const alertStyle = ({ color, status }, { colors }) => {
    const alertColor = color || status;
    const bg = colors[alertColor][50] === colors['white'] ? colors[alertColor][100] : colors[alertColor][50];
    return {
        style: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            rounded: 'radius',
            p: 'spacing-sm',
            mb: 'spacing',
        },

        variants: {
            subtle: {
                bg,
            },
            opacity: {
                color: colors[alertColor][500],
                background: addOpacity(colors[alertColor][500], .2),
            },
            solid: {
                bg: `${alertColor}.500`,
                color: 'white',
            },
            'left-accent': {
                bg: colors.pageBg,
                color: colors.titleText,
                borderLeft: '2px',
                borderColor: `${alertColor}.500`,
                roundedTopLeft: 0,
                roundedBottomLeft: 0,
            },
            'top-accent': {
                bg: colors.pageBg,
                color: colors.titleText,
                borderTop: '2px',
                borderColor: `${alertColor}.500`,
                roundedTopLeft: 0,
                roundedTopRight: 0,
            },
        },
        statuses: {
            info: { icon: 'info', color: 'info' },
            warning: { icon: 'warning-2', color: 'warning' },
            success: { icon: 'check-circle', color: 'success' },
            error: { icon: 'warning', color: 'error' },
        },
    };
};

const useAlertStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].alert ? theme['styles'].alert(props, theme) : alertStyle(props, theme);

    return {
        root: {
            // base style
            ...styles.style,
            // variant style
            ...styles.variants[props.variant || 'leftAccent'],
        },
        status: styles.statuses[props.status],
    };
};

export const useAlertIconStyle = ({ variant, color }) => {
    if (['left-accent', 'top-accent', 'subtle'].includes(variant)) {
        return {
            height: '100%',
            color: `${color}.500`,
        };
    }

    return {
        height: '100%',
    };
};

export default useAlertStyle;
