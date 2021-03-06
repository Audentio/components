import { storiesOf } from '@storybook/react';
import React from 'react';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Switch } from './Switch';

const stories = storiesOf('Switch', module);

stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <Stack isInline>
        <Switch size="sm" onChange={e => console.log(e)} color="green" />
        <Switch size="md" onChange={e => console.log(e)} color="blue" />
        <Switch size="lg" isDisabled onChange={e => console.log(e)} color="cyan" />
    </Stack>
));
