import { storiesOf } from '@storybook/react';
import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '.';
import { Box } from '../Box';
import { CloseButton } from '../CloseButton';

const stories = storiesOf('Alert', module);

stories.addDecorator(story => (
    <Box maxWidth="sm" mt="40px" mx="auto">
        {story()}
    </Box>
));

stories.add('Default', () => {
    return (
        <Alert>
            <AlertIcon />
            <AlertTitle display="inline-block" mr="spacing-sm">
                Basic Alert
            </AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    );
});

stories.add('Top Accent', () => {
    return (
        <Alert status="success" variant="top-accent">
            <AlertIcon />
            <Box flex="1">
                <AlertTitle>Holy Smokes!</AlertTitle>
                <AlertDescription>Something just happened!</AlertDescription>
            </Box>
        </Alert>
    );
});

stories.add('Subtle', () => {
    return (
        <Alert status="success" variant="subtle" alignItems="start">
            <AlertIcon />
            <Box flex="1">
                <AlertTitle>Holy Smokes!</AlertTitle>
                <AlertDescription>Something just happened!</AlertDescription>
            </Box>
        </Alert>
    );
});

stories.add('Solid', () => {
    return (
        <Alert status="error" variant="solid" justifyContent="center">
            <AlertIcon />
            <AlertTitle display="inline-block" mr="spacing-sm">
                Your browser is outdated!
            </AlertTitle>
            <AlertDescription display="inline-block">Your Chakra experience may be degraded.</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    );
});

stories.add('Opacity', () => {
    return (
        <Alert status="error" variant="opacity" justifyContent="center">
            <AlertIcon />
            <AlertTitle display="inline-block" mr="spacing-sm">
                Your browser is outdated!
            </AlertTitle>
            <AlertDescription display="inline-block">Your Chakra experience may be degraded.</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    );
});
