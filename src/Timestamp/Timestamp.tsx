import formatTime from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import formatRelative from 'date-fns/formatRelative';
import React, { Component } from 'react';
import { Text } from '../Text';
import { handleTimezone } from './handleTimezone';
import { parseTimestring } from './parseTimestring';

export interface TimestampProps {
    className?: string;

    /**
     * Valid date string or object
     * new Date() / UNIX time / ISO 8601 / (deprecated) RFC2822
     */
    children: string | Date;

    /**
     * Custom date format
     * https://date-fns.org/v2.0.0-alpha.6/docs/format
     *
     * @example format="MMMM do, yyyy" // (May 7th, 2018)
     */
    format?: string;

    /**
     * Output type (overrides format prop)
     * - **relative**: "4 days ago", "about one year ago"
     * - **calendar**: "Sunday at 04:30 a.m.", "12/31/2017"
     * - **absolute**: "January 15th 2018, 5:30 pm"
     */
    output?: 'relative' | 'calendar' | 'absolute';

    /**
     * Format Options
     * https://date-fns.org/v2.0.0-alpha.6/docs/Options
     */
    formatOptions?: Object;

    /**
     * Live update timestamp
     * defaults to true when output is defined
     */
    liveUpdate?: boolean;

    /**
     * Return string without wrapping element
     * when true, className will have no effect
     */
    noWrap?: boolean;
}

type FormatOptions = {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    additionalDigits?: 0 | 1 | 2;
    locale?: Locale;
    includeSeconds?: boolean;
    addSuffix?: boolean;
    unit?: 's' | 'm' | 'h' | 'd' | 'M' | 'Y';
    roundingMethod?: 'floor' | 'ceil' | 'round';
};

/**
 * Render date string/object as timestamp
 *
 * @example Render a relative timestamp with live updates
 * <Timestamp output="relative" liveUpdate>{new Date('Mon May 03 2018 05:41:46')}</Timestamp>
 *
 * @example Render timestamp with custom format
 * <Timestamp format="hh:mm dd/MM/yyyy">Mon May 03 2018 05:41:46</Timestamp>
 */
export class Timestamp extends Component<TimestampProps> {
    _timer: number;

    static format = (date: string | Date | number, format: string, options?: FormatOptions) => {
        if (!date) {
            return null;
        }

        return handleTimezone(
            formatTime(parseTimestring(date), format, {
                useAdditionalDayOfYearTokens: true,
                useAdditionalWeekYearTokens: true,
                ...options,
            })
        );
    };

    static defaultProps = {
        format: 'MMMM do yyyy, h:mm a',
        formatOptions: {},
    };

    public componentDidMount(): void {
        const { output, liveUpdate } = this.props;

        let shouldLiveUpdate = output === 'relative';

        if (typeof liveUpdate === 'boolean') {
            shouldLiveUpdate = liveUpdate;
        }

        if (shouldLiveUpdate) {
            this.startUpdating();
        }
    }

    public componentWillUnmount(): void {
        this.stopUpdating();
    }

    startUpdating() {
        this._timer = window.setInterval(() => {
            this.forceUpdate();
        }, 60 * 1000);
    }

    stopUpdating() {
        clearInterval(this._timer);
    }

    format(time: string | Date): string {
        if (!time) {
            return null;
        }

        try {
            const { output, format, formatOptions } = this.props;

            const baseDate = new Date();

            if (output) {
                switch (output) {
                    case 'calendar':
                        return handleTimezone(formatRelative(parseTimestring(time), baseDate, formatOptions));
                    case 'relative':
                        return formatDistance(parseTimestring(time), baseDate, {
                            addSuffix: true,
                            ...formatOptions,
                        });

                    // absolute by default
                    default:
                        return handleTimezone(
                            formatTime(parseTimestring(time), 'MMMM do yyyy, h:mm a', {
                                useAdditionalDayOfYearTokens: true,
                                useAdditionalWeekYearTokens: true,
                                ...formatOptions,
                            })
                        );
                }
            }

            return handleTimezone(
                formatTime(parseTimestring(time), format, {
                    useAdditionalDayOfYearTokens: true,
                    useAdditionalWeekYearTokens: true,
                    ...formatOptions,
                })
            );
        } catch (e) {
            // Sentry.captureException(e);

            return 'Invalid Date';
        }
    }

    public render(): React.ReactNode {
        const { children, className, output, format, liveUpdate, noWrap, formatOptions, ...rest } = this.props;

        let time_abs;

        try {
            time_abs = formatTime(parseTimestring(children), 'MMMM do yyyy, h:mm a', {
                useAdditionalDayOfYearTokens: true,
                useAdditionalWeekYearTokens: true,
                ...formatOptions,
            });
        } catch (e) {
            time_abs = 'Invalid Date';
        }

        if (noWrap) {
            return this.format(children);
        }

        return (
            <Text className={className} title={time_abs} {...rest}>
                {this.format(children)}
            </Text>
        );
    }
}
