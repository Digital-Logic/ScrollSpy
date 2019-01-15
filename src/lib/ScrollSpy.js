import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce, throttle } from './util';


class ScrollSpy extends PureComponent {

    state = {
        positions: [],
        active: '',
        elements: []
    }

    componentDidMount() {
        this.setState({
            elements: this.props.items.map( id => document.getElementById(id))
        });

        window.addEventListener('resize', this.onResize);
        window.addEventListener('scroll', this.onScroll);

        this.onResize();
    }

    componentDidUpdate() {
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);
        this.onResize.cancel();
        this.onScroll.cancel();
    }

    onScroll = throttle(() => {
        const { positions, active } = this.state;

        const newActive =  positions.reduce( (newActive, curPos, index) => {
            if (this.props.isActive(curPos.top, curPos.bottom))
                return this.state.elements[index].id;
            return newActive;

        }, '');

        if (newActive !== active) {
            this.setState({
                active: newActive
            });
        }
    }, this.props.scrollRate);

    onResize = debounce(() => {
        const { positions } = this.state;

        const newPositions = this.state.elements.map( el => el.getBoundingClientRect())
            .map( ({top, bottom}, index) => ({
                top: top + window.scrollY,
                bottom: bottom + window.scrollY
            }));

        if (Object.entries(newPositions).reduce( (isDif, [key, value]) => {

            if ( positions[key] === undefined ||
                    value.bottom !== positions[key].bottom ||
                    value.top !== positions[key].top)
                return true;
            return isDif;
        }, false)) {
            this.onScroll();
            this.setState({
                positions: newPositions
            });
        }
    }, this.props.resizeRate);

    render() {
        return this.props.children(this.state.active);
    }

    static get propTypes() {
        return {
            items: PropTypes.arrayOf(PropTypes.string),
            isActive: PropTypes.func.isRequired,
            scrollRate: PropTypes.number,
            resizeRate: PropTypes.number
        };
    }
    static get defaultProps() {
        return {
            isActive: findActivePage,
            items: [],
            scrollRate: 120,
            resizeRate: 500
        };
    }
}

function findActivePage(top, bottom) {
    if (top < window.pageYOffset + window.innerHeight * 1 / 3 )
        return true;
    return false;
}


export default ScrollSpy;