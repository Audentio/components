import { addDecorator, configure } from '@storybook/react';
import React, { useState } from 'react';
import { Box } from '../src/Box';
import { Button } from '../src/Button';
import { CSSReset } from '../src/CSSReset';
import { ThemeProvider } from '../src/ThemeProvider';

const req = require.context('../src', true, /examples\.(js|mdx|ts|tsx)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

const storyStyle = {
    light: {
        pageBg: 'white',
        switchTo: {
            label: 'Dark',
            value: 'dark',
        },
        buttonBg: 'black',
        buttonColor: 'white',
    },
    dark: {
        pageBg: 'gray.800',
        switchTo: {
            label: 'Light',
            value: 'light',
        },
        buttonBg: 'white',
        buttonColor: 'black',
    },
};

const AppProvider = ({ children }) => {
    const [currentColorMode, setCurrentColorMode] = useState('light');
    const story = storyStyle[currentColorMode];

    return (
        <ThemeProvider>
            <CSSReset />
            {/* <CurrentColorMode> */}
            <Box position="fixed" right={4} top={4} zIndex={1}>
                <Button
                    onClick={() => {
                        setCurrentColorMode(story.switchTo.value);
                    }}
                    size="sm"
                    bg={story.buttonBg}
                    color={story.buttonColor}
                >
                    Switch to {story.switchTo.label} mode
                </Button>
            </Box>
            <Box bg={story.pageBg} minHeight="100vh">
                {children}
            </Box>
            {/* </CurrentColorMode> */}
        </ThemeProvider>
    );
};

addDecorator(story => <AppProvider>{story()}</AppProvider>);

configure(loadStories, module);
