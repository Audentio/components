import { ITheme } from '../theme/types';

interface Config {
    color: string;
    bg: string;
    borderColor: string;
    placeholderColor: string;
    noHeight: boolean;
    noOverflow: boolean;
}

export type CSSResetProps = {
    config?: (theme: ITheme, defaultConfig?: Config) => Config;
};
