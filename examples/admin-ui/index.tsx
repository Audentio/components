import update from 'immutability-helper';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../../src';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../../src/Alert';
import { alertStyle } from '../../src/Alert/styles';
import { Box } from '../../src/Box';
import { CSSReset } from '../../src/CSSReset';
import theme from './theme';

function AdminUI(props) {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Alert mt="2" variant="left-accent" status="success" maxWidth="sm" mx="auto" alignItems="start">
                <AlertIcon />
                <Box flex="1">
                    <AlertTitle>Holy Smokes!</AlertTitle>
                    <AlertDescription>Something just happened!</AlertDescription>
                </Box>
            </Alert>

            <ThemeProvider
                theme={update(theme, {
                    styles: {
                        alert: {
                            $set: ($props, $theme) =>
                                update(alertStyle($props, $theme), {
                                    variants: {
                                        leftAccent: { borderLeft: { $set: '5px solid' } },
                                    },
                                }),
                        },
                    },
                })}
            >
                <Alert mt="2" variant="leftAccent" status="error" maxWidth="sm" mx="auto" alignItems="start">
                    <AlertIcon />
                    <Box flex="1">
                        <AlertTitle>Holy Smokes!</AlertTitle>
                        <AlertDescription>Something just happened!</AlertDescription>
                    </Box>
                </Alert>
            </ThemeProvider>
        </ThemeProvider>
    );
}

ReactDOM.render(<AdminUI />, document.getElementById('root'));
