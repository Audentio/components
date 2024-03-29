import { storiesOf } from '@storybook/react';
import React from 'react';
import { FormControl } from '.';
import { Box } from '../Box';
import { FormErrorMessage } from '../FormErrorMessage';
import { FormHelperText } from '../FormHelperText';
import { FormLabel } from '../FormLabel';
import { Input } from '../Input';
import { InputLeftAddon } from '../InputAddon';
import { InputGroup } from '../InputGroup';
import { Select } from '../Select';

const stories = storiesOf('FormControl', module).addDecorator((story) => (
    <Box maxWidth="sm" mx="auto" mt={5}>
        {story()}
    </Box>
));

stories.add('Default', () => (
    <FormControl isRequired>
        <FormLabel htmlFor="fname">First name</FormLabel>
        <Input id="fname" placeholder="First name" />
    </FormControl>
));

stories.add('with select', () => (
    <FormControl isInvalid>
        <FormLabel htmlFor="fname">First name</FormLabel>
        <Select id="fname" name="fname" placeholder="First name" />
    </FormControl>
));

stories.add('with helper text', () => (
    <FormControl>
        <FormLabel htmlFor="lname">Last name</FormLabel>
        <Input id="lname" aria-describedby="lname-help" placeholder="Last name" />
        <FormHelperText id="lname-help">Ensure it's up to 7 characters</FormHelperText>
    </FormControl>
));

stories.add('with input group', () => (
    <FormControl>
        <FormLabel>Portfolio url</FormLabel>
        <InputGroup>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input roundedLeft="0" placeholder="Welcome" />
        </InputGroup>
        <FormHelperText>Add your website here</FormHelperText>
    </FormControl>
));

stories.add('with error', () => (
    <FormControl isInvalid>
        <FormLabel htmlFor="url">Website</FormLabel>
        <InputGroup>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input type="url" id="url" aria-describedby="url-error" roundedLeft="0" placeholder="awesomesite.com" />
        </InputGroup>
        <FormErrorMessage id="url-error">Website is invalid</FormErrorMessage>
    </FormControl>
));
