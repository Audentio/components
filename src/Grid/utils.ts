// These helper fns are modified versions of the amazing rebass library
// https://github.com/rebassjs/rebass/blob/master/packages/layout/src/index.js

const px = n => (typeof n === 'number' ? n + 'px' : n);

export const widthToColumns = (width, autoFill) => {
    if (Array.isArray(width)) {
        return width.map( (w) => widthToColumns(w, autoFill));
    }

    let grow = 'auto-fit';
    if (autoFill) {
        grow = 'auto-fill';
    }

    if (width !== null && typeof width === 'object' && Object.keys(width).length > 0) {
        const acc = {};
        for (const key in width) {
            acc[key] = `repeat(${grow}, minmax(${px(width[key])}, 1fr))`;
        }
        return acc;
    }

    if (width != null) {
        return `repeat(${grow}, minmax(${px(width)}, 1fr))`;
    }

    return null;
};

export const countToColumns = count => {
    if (Array.isArray(count)) {
        return count.map(countToColumns);
    }

    if (count !== null && typeof count === 'object' && Object.keys(count).length > 0) {
        const acc = {};
        for (const key in count) {
            acc[key] = `repeat(${count[key]}, minmax(0, 1fr))`;
        }
        return acc;
    }

    if (count != null) {
        return `repeat(${count}, minmax(0, 1fr))`;
    }

    return null;
};
