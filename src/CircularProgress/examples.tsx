import { storiesOf } from '@storybook/react';
import React from 'react';
import { CircularProgress, CircularProgressLabel } from '.';

const stories = storiesOf('Circular progress', module);

stories.add('Default', () => (
    <CircularProgress capIsRound value={60}>
        <CircularProgressLabel>60</CircularProgressLabel>
    </CircularProgress>
));

stories.add('indeterminate', () => (
    <div>
        <CircularProgress value={60} capIsRound isIndeterminate color="red.500" />
    </div>
));
