import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import ScrollSpy from '../lib/ScrollSpy';
import { pageAnchors } from '../Routes/Home';
import { HashLink as Link } from 'react-router-hash-link';
import compose from 'recompose/compose';

const styles = theme => ({
    menuItem: {
        position: 'relative',
        '&:after': {
            content: "''",
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderBottom: '2px solid transparent'
        },
        '&.selected': {
            '&:after': {
                borderColor: theme.palette.text.primary
            }
        }
    }
});

function Menu ({classes}) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <ScrollSpy items={pageAnchors}>
                { (selected) => (
                        <Grid container justify="flex-end">
                        {
                            pageAnchors.map( (tag, index) => (
                                <Button
                                    key={index}
                                    component={Link}
                                    smooth
                                    to={`#${tag}`}
                                    className={classNames(classes.menuItem,{
                                        selected: tag === selected
                                    })}>{tag}</Button>
                            ))
                        }
                        </Grid>
                    )
                }
                </ScrollSpy>
            </Toolbar>
        </AppBar>
    );
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(styles)
) (Menu);
