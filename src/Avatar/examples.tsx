import { storiesOf } from '@storybook/react';
import React from 'react';
import { Avatar, AvatarBadge } from '.';
import { AvatarGroup } from '../AvatarGroup';
import { Box } from '../Box';
import { IAvatar } from './types';

const stories = storiesOf('Avatar', module);
stories.addDecorator((story) => (
    <Box maxWidth="lg" mt="40px" mx="auto">
        {story()}
    </Box>
));

stories.add('Default', () => (
    <>
        {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size: IAvatar['size']) => (
            <Avatar mr="spacing-sm" size={size} name="Uchiha Itachi" src="https://bit.ly/uchiha-itachi">
                <AvatarBadge size="1.25em" />
            </Avatar>
        ))}
    </>
));

stories.add('Default (w/o image)', () => <Avatar useExact name="Uchiha Itachi" />);

stories.add('Avatar Group', () => (
    <AvatarGroup size="md" max={2}>
        <Avatar name="Uchiha Itachi" src="https://bit.ly/uchiha-itachi" />
        <Avatar
            name="Uchiha Sasuke"
            src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
        />
        <Avatar
            name="Uchiha Sasuke"
            src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
        />
        <Avatar
            name="Uchiha Sasuke"
            src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
        />
        <Avatar
            name="Uchiha Sasuke"
            src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
        />
    </AvatarGroup>
));
