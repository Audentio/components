import { AnimatePresence, motion, usePresence } from 'framer-motion';
import React, { createContext, forwardRef, MouseEvent, useContext } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { RemoveScroll } from 'react-remove-scroll';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { Card } from '../Card';
import { CloseButton } from '../CloseButton';
import { CloseButtonProps } from '../CloseButton/types';
import { Flex } from '../Flex';
import useModalStyle, { useModalOverlayStyle, useModalWrapperStyle } from '../Modal/styles';
import { Portal } from '../Portal';
import { fadeConfig } from '../Transition/fade';
import { ModalTransition } from './modal-transition';
import { ModalContext as ModalContextType, ModalProps } from './types';
import { callAllHandlers, useModal } from './use-modal';

// @ts-ignore
const ModalContext = createContext<ModalContextType>({});
const useModalContext = () => useContext(ModalContext);

/**
 * Modal provides context, theming, and accessibility properties
 * to all other modal components.
 *
 * It doesn't render any DOM node.
 */
export const Modal: React.FC<ModalProps> = (props) => {
    const {
        portalProps,
        children,
        autoFocus,
        trapFocus,
        initialFocusRef,
        finalFocusRef,
        returnFocusOnClose,
        blockScrollOnMount,
        allowPinchZoom,
        preserveScrollBarGap,
        motionPreset,
        lockFocusAcrossFrames,
        isCentered = true,
        size = 'md',
    } = props;

    const modal = useModal(props);

    const context = {
        ...modal,
        autoFocus,
        trapFocus,
        initialFocusRef,
        finalFocusRef,
        returnFocusOnClose,
        blockScrollOnMount,
        allowPinchZoom,
        preserveScrollBarGap,
        motionPreset,
        lockFocusAcrossFrames,
        size,
        isCentered,
    };

    return (
        <ModalContext.Provider value={context}>
            <AnimatePresence>{context.isOpen && <Portal {...portalProps}>{children}</Portal>}</AnimatePresence>
        </ModalContext.Provider>
    );
};

Modal.defaultProps = {
    lockFocusAcrossFrames: true,
    returnFocusOnClose: true,
    scrollBehavior: 'outside',
    trapFocus: true,
    autoFocus: true,
    blockScrollOnMount: true,
    allowPinchZoom: false,
    motionPreset: 'scale',
};

export interface ModalContentProps {
    /**
     * The props to forward to the modal's content wrapper
     */
    containerProps?: any;
}

const MotionDiv = motion.div;

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const ModalContent = forwardRef((props: ModalContentProps & BoxProps, ref) => {
    const { children, containerProps: rootProps, ...rest } = props;

    const { getDialogProps, getDialogContainerProps, size, isCentered, noStyles } = useModalContext();

    const dialogProps = getDialogProps(rest, ref) as any;
    const containerProps = getDialogContainerProps(rootProps);

    const modalWrapperStyleProps = useModalWrapperStyle({
        isCentered,
        noStyles,
    });

    const modalStyleProps = useModalStyle({
        isCentered,
        noStyles,
    });

    const { motionPreset } = useModalContext();

    const { ref: dialogRef, ...dialogPropsRest } = dialogProps;

    return (
        <ModalFocusScope>
            <Box zIndex="modal" {...modalWrapperStyleProps} {...containerProps}>
                <Card zIndex="modal" p={0} w="100%" maxWidth={size} {...modalStyleProps} {...dialogPropsRest}>
                    <ModalTransition preset={motionPreset} ref={dialogRef}>
                        {children}
                    </ModalTransition>
                </Card>
            </Box>
        </ModalFocusScope>
    );
});

interface ModalFocusScopeProps {
    /**
     * @type React.ReactElement
     */
    children: React.ReactElement;
}

export function ModalFocusScope(props: ModalFocusScopeProps) {
    const {
        autoFocus,
        trapFocus,
        dialogRef,
        initialFocusRef,
        blockScrollOnMount,
        allowPinchZoom,
        finalFocusRef,
        returnFocusOnClose,
        preserveScrollBarGap,
        lockFocusAcrossFrames,
    } = useModalContext();

    const [isPresent, safeToRemove] = usePresence();

    React.useEffect(() => {
        if (!isPresent && safeToRemove) {
            setTimeout(safeToRemove);
        }
    }, [isPresent, safeToRemove]);

    return (
        <FocusLock
            autoFocus={autoFocus}
            isDisabled={!trapFocus}
            initialFocusRef={initialFocusRef}
            finalFocusRef={finalFocusRef}
            restoreFocus={returnFocusOnClose}
            contentRef={dialogRef}
            lockFocusAcrossFrames={lockFocusAcrossFrames}
        >
            <RemoveScroll
                removeScrollBar={!preserveScrollBarGap}
                allowPinchZoom={allowPinchZoom}
                enabled={blockScrollOnMount}
                forwardProps
            >
                {props.children}
            </RemoveScroll>
        </FocusLock>
    );
}

/**
 * ModalOverlay renders a backdrop behind the modal. It is
 * also used as a wrapper for the modal content for better positioning.
 *
 */
export const ModalOverlay = forwardRef((props: BoxProps, ref) => {
    const overlayStyle = useModalOverlayStyle({});

    const { motionPreset } = useModalContext();
    const motionProps: any = motionPreset === 'none' ? {} : fadeConfig;

    return (
        <MotionDiv
            style={{
                ...overlayStyle,
                ...props,
            }}
            {...motionProps}
            ref={ref}
        />
    );
});

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 */
export const ModalHeader = forwardRef((props: BoxProps, ref) => {
    const { headerId, setHeaderMounted } = useModalContext();

    /**
     * Notify us if this component was rendered or used
     * so we can append `aria-labelledby` automatically
     */
    React.useEffect(() => {
        setHeaderMounted(true);
        return () => setHeaderMounted(false);
    }, [setHeaderMounted]);

    const headerStyles = {
        p: 'spacing',
        flex: 0,
        justify: 'space-between',
        align: 'center',
        color: 'titleText',
    };

    return <Flex pos="relative" ref={ref} id={headerId} as="header" {...headerStyles} {...props} />;
});

export const ModalBody = forwardRef((props: BoxProps, ref) => {
    const { bodyId, setBodyMounted } = useModalContext();

    /**
     * Notify us if this component was rendered or used
     * so we can append `aria-describedby` automatically
     */
    React.useEffect(() => {
        setBodyMounted(true);
        return () => setBodyMounted(false);
    }, [setBodyMounted]);

    return <Box ref={ref} id={bodyId} p="spacing" flex="1" color="bodyText" {...props} />;
});

export const ModalFooter = forwardRef((props: BoxProps, ref) => (
    <Flex justify="flex-end" ref={ref} p="spacing" as="footer" {...props} />
));

/**
 * ModalCloseButton is used closes the modal.
 *
 * You don't need to pass the `onClick` to it, it reads the
 * `onClose` action from the modal context.
 */
export const ModalCloseButton = forwardRef((props: CloseButtonProps, ref) => {
    const { onClick, ...rest } = props;
    const { onClose } = useModalContext();

    return (
        <CloseButton
            ref={ref}
            onClick={callAllHandlers(onClick, (event: MouseEvent) => {
                event.stopPropagation();
                onClose();
            })}
            {...rest}
        />
    );
});
