import React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { FlexProps } from '../Flex/types';
import { PseudoBoxProps } from '../PseudoBox';

export interface ITabs {
    /**
     * The alignment of the tabs
     */
    align?: 'start' | 'center' | 'end';
    /**
     * The style of the tabs to use
     */
    variant?: 'line' | 'enclosed' | 'enclosed-colored' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
    /**
     * If `true`, tabs will stretch to width of the tablist.
     */
    isFitted?: boolean;
    /**
     * The orientation of the <TabList/>.
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * The size of the tab (affects the font-size and padding).
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * If `true`, the tabs will be manually activated and
     * display its panel by pressing Space or Enter.
     *
     * If `false`, the tabs will be automatically activated
     * and their panel is displayed when they receive focus.
     */
    isManual?: boolean;
    /**
     * The children of the tabs should be `TabPanel` and `TabList`.
     */
    children: React.ReactNode;
    /**
     * Callback when the index (controlled or un-controlled) changes.
     */
    onChange?: (index: number) => void;
    /**
     * The index of the activated tab
     */
    index?: number;
    /**
     * The index of the tab that should be activated initially
     */
    defaultIndex?: number;
    /**
     * The color scheme of the tabs
     *
     * 🚨Note: This should be one of the color keys in the theme that has `100` - `900` color values (e.g.`green`, `red`).
     * @see http://chakra-ui.com/theme#colors
     */
    variantColor?: string;

    /**
     * If enabled, display scrollbar when there is overflow. Defaults to hiding.
     */
    showScrollbar?: boolean;
}

export type TabsProps = ITabs & Omit<BoxProps, 'onChange' | 'size'>;

export interface ITabList {
    /**
     * The children of the tab list should be `Tab`.
     */
    children: React.ReactNode;

    /**
     * Outer layer styling for tablist
     */
    containerStyle?: { [key: string]: string };
}

export type TabListProps = ITabList & FlexProps;

export interface ITabPanel {
    /**
     * The id of the tab panel.
     * @private Used during `cloneElement`
     */
    id?: string;
    /**
     * If `true`, indicates that the panel is selected.
     * @private Used during `cloneElement`
     */
    isSelected?: boolean;
    /**
     * The children of the tab panel.
     */
    children: React.ReactNode;
    /**
     * The ref of the panel if it is selected.
     * @private Used during `cloneElement`
     */
    selectedPanelRef?: React.RefObject<HTMLElement>;
}
export type TabPanelProps = ITabPanel & BoxProps;

export interface ITabPanels {
    /**
     * The children of the tab panels should be `TabPanel`.
     */
    children: React.ReactNode;
}

export type TabPanelsProps = ITabPanels & BoxProps;

export interface ITab {
    href?: string;
    exact?: boolean;

    isDisabled?: boolean;
    isSelected?: boolean;
    pathname?: string;

    // optional params to only be applied if tab is active
    activeProps?: Object;
}

export type TabProps = ITab & PseudoBoxProps & React.ButtonHTMLAttributes<any>;

interface ITabContext {
    id?: string;

    manualIndex?: number;
    onChangeTab?: (index: number) => void;
    onManualTabChange?: (index: number) => void;
    onFocusPanel?: () => void;
    selectedPanelRef?: React.RefObject<HTMLElement>;
    color?: string;
}

export type TabContextProps = ITabContext & Omit<ITabs, 'children'>;
