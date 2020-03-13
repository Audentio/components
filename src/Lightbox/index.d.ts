import * as React from 'react';

export interface ILightbox {
    /**
     *  If `true`, the lightbox will be displayed
     */
    isOpen?: boolean;
    /**
     * Event that gets fired when the lightbox overlay or close button are clicked.
     */
    onClose?: boolean;
    /**
     * (For Gallery) If 'true', show Prev and Next arrows for media navigation
     */
    showControls?: boolean;
    /**
     * Allows custom keydown events for lightbox. Gallery uses for arrow onPrev, onNext arrows
     */
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

export interface ILightboxMedia {
    /**
     *  media item src
     */
    src: string;
}

export type LightboxProps = ILightbox;
export type LightboxMediaProps = ILightboxMedia;

declare const Lightbox: React.FC<LightboxProps>;
declare const LightboxMedia: React.FC<LightboxMediaProps>;
declare const LightboxGalleryProvider: React.FC;

/**
 *  useGalleryContext exposes the following props. can be used in cases such as adding off-screen images
 *  register(mediaItem): function to add new item to lightbox
 *  unregister(mediaItem): function to remove an item from the lightbox
 *  media[]: array of current items in the lightbox
 *  activeItem: current active lightbox item. lightbox will not display if there is no activeItem
 *  activeIndex: index of active item in array
 *  setActiveItem(mediaItem): set new activeItem
 *  onPrev: set active item to current index - 1
 *  onNext: set active item to current index + 1
 */
declare function useGalleryContext<T>(value: T): T;

export default Lightbox;

export { LightboxMedia, LightboxGalleryProvider, useGalleryContext };