type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>;

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
    if (ref == null) return;

    if (typeof ref === 'function') {
        ref(value);
        return;
    }

    try {
        if (ref) {
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            ref.current = value;
        }
    } catch (error) {
        throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
    }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
export function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
    return (node: T | null) => {
        refs.forEach((ref) => assignRef(ref, node));
    };
}
