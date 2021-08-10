import { useTheme } from '../ThemeProvider';

export const formLabelStyle = ({ isDisabled }, theme) => ({
    style: {
        color: isDisabled ? 'disabled' : 'faintText',
        fontWeight: 'medium',
        textAlign: 'left',
        cursor: 'pointer',
        kind: 'small',
        verticalAlign: 'middle',
        display: 'block',
        whiteSpace: 'nowrap',
    },
    requiredIndicator: {
        color: 'error.500',
        ml: 'spacing-sm',
    },
});

const useFormLabelStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].formLabel ? theme['styles'].formLabel(props, theme) : formLabelStyle(props, theme);

    return {
        // base style
        root: styles.style,
        requiredIndicator: styles.requiredIndicator,
    };
};

export default useFormLabelStyle;
