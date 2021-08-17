import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { InputGroup } from '.';
import { Box } from '../Box';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { InputLeftAddon, InputRightAddon } from '../InputAddon';
import { InputLeftElement, InputRightElement } from '../InputElement';

const stories = storiesOf('Input Group', module).addDecorator((story) => {
    return (
        <Box maxWidth="sm" mx="auto" mt={5}>
            {story()}
        </Box>
    );
});

const size = 'md';

stories.add('with addons', () => (
    <Box>
        <InputGroup size={size} label="Addon left" id="left">
            <InputLeftAddon>+234</InputLeftAddon>
            <Input roundedLeft="0" placeholder="Welcome" />
        </InputGroup>
        <InputGroup size={size} label="Addon right" id="right">
            <InputRightAddon>.com</InputRightAddon>
            <Input roundedRight="0" placeholder="Welcome" />
        </InputGroup>
        <InputGroup size={size} label="Error" error="This is an error" isInvalid>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input rounded="0" placeholder="mysite" />
            <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
    </Box>
));

stories.add('with icons', () => (
    <Box>
        <InputGroup size={size}>
            <InputLeftElement>
                <Icon name="phone" />
            </InputLeftElement>
            <Input placeholder="Welcome" />
        </InputGroup>
        <InputGroup size={size}>
            <InputRightElement>
                <Icon name="check" />
            </InputRightElement>
            <Input placeholder="Welcome" />
        </InputGroup>
        <InputGroup>
            <InputLeftElement>
                <Icon name="phone" />
            </InputLeftElement>
            <InputRightElement>
                <Icon name="check" />
            </InputRightElement>
            <Input placeholder="Welcome" />
        </InputGroup>
    </Box>
));

stories.add('with tooltip', () => (
    <Box>
        <InputGroup size={size} label="Welcome" tooltip="This is a test tooltip" tooltipTitle="Welcome">
            <Input placeholder="Welcome" />
        </InputGroup>
    </Box>
));

const PasswordInput = () => {
    const [show, setShow] = useState(false);
    return (
        <InputGroup size="md" label="Password" id="password" tooltip={<Box>hello</Box>}>
            <Input pr="72px" type={show ? 'text' : 'password'} placeholder="Enter password" />
            <InputRightElement width="72px">
                <Button size="sm" variant="unstyled" onClick={() => setShow(!show)}>
                    {show ? 'HIDE' : 'SHOW'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

stories.add('password input', () => <PasswordInput />);
