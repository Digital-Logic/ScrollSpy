import React, { Component } from 'react';
import applyTheme from './theme';
import { Switch, Route } from 'react-router-dom';
import { Routes, Home } from './Routes';
import Menu from './Components/Menu';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

const styles = theme => ({
    menuBuffer: {
        ...theme.mixins.toolbar
    }
});

class App extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Menu />
                {/* <div className={classes.menuBuffer} /> */}
                <Switch>
                    <Route path={Routes.HOME} component={Home} />
                </Switch>
            </div>
        );
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired
        };
    }
}

export default compose (
    applyTheme,
    withStyles(styles)
)(App);
