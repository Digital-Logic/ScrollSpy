import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce, throttle } from './util';


class ScrollSpy extends PureComponent {

    state = {
        active: ''
    };

    positions = [];
    elements = [];
    elementIds = [];

    componentDidMount() {
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

        this.onResize = () => {};
        this.onScroll = () => {};
    }

    onScroll = throttle(() => {
        const { active } = this.state;

        const newActive =  this.positions.reduce( (newActive, curPos, index) => {
            if (this.props.isActive(curPos.top, curPos.bottom))
                return this.elements[index].id;
            return newActive;

        }, '');

        if (newActive !== active) {
            this.setState({
                active: newActive
            });
        }
    }, this.props.scrollRate);

    onResize = debounce(() => {
        this.reMap();

        const newPositions = this.elements.map( el => el.getBoundingClientRect())
            .map( ({top, bottom}, index) => ({
                top: top + window.pageYOffset,
                bottom: bottom + window.pageYOffset
            }));

        if (Object.entries(newPositions).reduce( (isDif, [key, value]) => {

            if ( this.positions[key] === undefined ||
                    value.bottom !== this.positions[key].bottom ||
                    value.top !== this.positions[key].top)
                return true;
            return isDif;
        }, false)) {
            this.onScroll();
            this.positions = newPositions;
        }
    }, this.props.resizeRate);

    reMap() {
        if ( this.props.items.reduce( (remap, curId, indexOf) => {
            if (curId !== this.elementIds[indexOf])
                return true; // remap
            return remap;
        }, false))
        {
            this.elementIds = this.props.items;
            this.elements = this.props.items.map( id => document.getElementById(id));
        }
    }

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