import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        h1: {
            fontWeight: 600,
            fontSize: '3rem'
        }
    },
    palette: {
        type: 'dark',
        primary: {
            main: "#0ea09d"
        },
        text: {
            primary: "rgba(255,255,255,0.80)"
        },
        background: {
            default: "#434343"
        }

    }
});

function applyTheme(WrappedComponent) {
    return function (props) {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <WrappedComponent { ...props } />
            </MuiThemeProvider>
        );
    }
}

export default applyTheme;