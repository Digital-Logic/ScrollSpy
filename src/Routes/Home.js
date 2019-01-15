import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {

    },
    page: {
        display: 'block',
        width: '100%',
        padding: '30px',
        minHeight: '300px',
        color: 'rgba(255,255,255,0.5)',
        height: '100vh',
        '&:before': {
            display: 'block',
            content: "' '",
            position: 'relative',
            visibility: 'hidden',
            pointerEvents: 'none',
            // Converting theme.mixins.toolbar to height with @media queries.
            ...Object.entries(theme.mixins.toolbar).map( ([key, value]) => {
                if (typeof value !== 'object')
                    return {
                        height: value
                    };
                else if (value !== null) return {
                    [key]: {
                        height: value.minHeight
                    }
                }
                // flatten the array of objects
            }).reduce((acc, obj) => ({
                ...acc,
                ...obj
            }), {})
        }
    },
    page1: {
        backgroundColor: '#503c6c'
    },
    page2: {
        backgroundColor: '#2e2c49'
    },
    page3: {
        backgroundColor: '#134566'
    },
    page4: {
        backgroundColor: '#1d433a'
    }
});

class Home extends PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div id="page1" className={ classNames(classes.page, classes.page1)}>
                    <Typography color="inherit" variant="h1">Page 1</Typography>
                </div>

                <div id="page2" className={classNames(classes.page, classes.page2)}>
                    <Typography color="inherit" variant="h1">Page 2</Typography>
                </div>

                <div id="page3" className={classNames(classes.page, classes.page3)}>
                    <Typography color="inherit" variant="h1">Page 3</Typography>
                </div>
                <div id="page4" className={classNames(classes.page, classes.page4)}>
                    <Typography color="inherit" variant="h1">Page 4</Typography>
                </div>
            </div>
        );
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired
        };
    }
}


export const pageAnchors = ['page1', 'page2', 'page3', 'page4'];

export default compose(
    withStyles(styles)
) (Home);