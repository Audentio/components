import { css } from '@emotion/react';
import Color from 'color';

export const get = (color, hue) => `${color}.${hue}`;

export const addOpacity = (color, opacity) =>
    Color(color)
        .fade(1 - opacity)
        .rgb()
        .string();

export const addWhite = (color, opacity) => {
    return Color(color)
        .mix(Color('#fff'), opacity)
        .hex();
};

export const addBlack = (color, opacity) =>
    Color(color)
        .mix(Color('#000'), opacity)
        .hex();

export const isDarkColor = color => Color(color).isDark();

export const intensify = (color, factor = 0.2, mode = 'light') => {
    const p = Color(color);

    if (mode === 'light') {
        return p.darken(factor);
    }
    return p.lighten(factor);
};

export const diminish = (color, factor = 0.2, mode = 'light') => {
    const p = Color(color);

    if (mode === 'light') {
        return p.lighten(factor);
    }
    return p.darken(factor);
};

export const generateAlphaColors = color => ({
    900: addOpacity(color, 0.92),
    800: addOpacity(color, 0.8),
    700: addOpacity(color, 0.6),
    600: addOpacity(color, 0.48),
    500: addOpacity(color, 0.38),
    400: addOpacity(color, 0.24),
    300: addOpacity(color, 0.16),
    200: addOpacity(color, 0.12),
    100: addOpacity(color, 0.08),
    50: addOpacity(color, 0.04),
});

export const colorEmphasis = (color, emphasis) => {
    switch (emphasis) {
        case 'high':
            return color;
        case 'medium':
            return generateAlphaColors(color)[700];
        case 'low':
            return generateAlphaColors(color)[500];
        case 'lowest':
            return generateAlphaColors(color)[300];
        default:
            return null;
    }
};

export const generateStripe = ({ size = '1rem', color = 'rgba(255, 255, 255, 0.15)' }) => css`
    background-image: linear-gradient(
        45deg,
        ${color} 25%,
        transparent 25%,
        transparent 50%,
        ${color} 50%,
        ${color} 75%,
        transparent 75%,
        transparent
    );
    background-size: ${size} ${size};
`;

export const generateShades = primary => {
    const p = Color(primary);

    const shades = {
        50: p.lighten(0.8),
        100: p.lighten(0.4),
        200: p.lighten(0.3),
        300: p.lighten(0.2),
        400: p.lighten(0.1),
        500: p,
        600: p.darken(0.1),
        700: p.darken(0.2),
        800: p.darken(0.3),
        900: p.darken(0.4),
    };

    for (const key in shades) {
        shades[key] = shades[key].hex();
    }

    return shades;
};
