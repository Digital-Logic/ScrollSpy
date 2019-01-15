## React Scroll Spy

This scroll spy uses render props to allow the maximum level of flexibility.

[Live Demo](http://scroll-spy.ditital-loigc.net)

### Avalible Props
    items: Array of id strings,
    isActive: (optional) function to determine which anchor is in view
    scrollRate: (optional) Number of milliseconds to throttle scroll events
    resizeRate: (optional) Number of milliseconds to debounce dom recal on resize


Example

````jsx
import ScrollSpy from 'scrollSpy';

const anchors = ['page1','page2', 'page3'];

function Menu() {
    <ScrollSpy items={anchors}>
    { (selected) => (
        {
            anchors.map( (tag, index) => (
                <a
                    key={index}
                    href={`#${tag}`}
                    className={classNames({
                        selected: tag === selected
                    })}>{tag}</a>
            ))
        })
    }
    </ScrollSpy>
}
````

