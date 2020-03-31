/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import Box from '../Box';
import { valueToPercent } from '../Slider';
import { generateStripe } from '../theme/colors-utils';
import useProgressStyle, { useProgressIndicatorStyle } from './styles';
import { ProgressProps } from './types';

const stripe = keyframes`
  from { background-position: 1rem 0}
  to { background-position: 0 0 }
`;

const stripeAnimation = css`
    animation: ${stripe} 1s linear infinite;
`;

export const ProgressLabel = props => <Box textAlign="center" width="100%" {...props} />;

const ProgressIndicator = ({ isIndeterminate, min, max, value, ...rest }) => {
    const percent = valueToPercent(value, min, max);

    return (
        <Box
            height="100%"
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={isIndeterminate ? null : value}
            role="progressbar"
            transition="all 0.3s"
            width={`${percent}%`}
            {...rest}
        />
    );
};

const ProgressTrack = props => {
    return <Box pos="relative" {...props} />;
};

export const Progress = ({
    color = 'blue',
    value = 60,
    min = 0,
    max = 100,
    size = 'md',
    hasStripe,
    isAnimated,
    borderRadius,
    rounded,
    children,
    isIndeterminate,
    ...rest
}: ProgressProps) => {
    const _borderRadius = rounded || borderRadius;

    const trackStyleProps = useProgressStyle({
        borderRadius: _borderRadius,
        size,
    });

    const indicatorStyleProps = useProgressIndicatorStyle({
        color,
        borderRadius: _borderRadius,
        isIndeterminate,
    });

    return (
        <ProgressTrack {...trackStyleProps} {...rest}>
            <ProgressIndicator
                min={min}
                max={max}
                value={value}
                css={[hasStripe && generateStripe({}), hasStripe && isAnimated && stripeAnimation]}
                {...indicatorStyleProps}
            />
        </ProgressTrack>
    );
};