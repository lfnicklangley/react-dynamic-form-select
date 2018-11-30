export default {
    single: function ({ item, value = 'id', label = 'name' }) {
        return {
            label: item[label],
            value: `${item[value]}`
        };
    },
    map: function ({ items, value = 'id', label = 'name' }) {
        return items.map(item => this.single({ item, value, label }));
    },
    findIndex: function (value, options) {
        return options.findIndex(option => (
            option.value == value || option.label == value
        ));
    },
    internalSelect: function ({ name, onChange }, value, callback = () => null) {
        const event = document.createEvent('Event');

        event.initEvent('onChange', true, true);
        window.dispatchEvent(event);

        Object.defineProperty(event, 'target', {
            writable: false,
            value: {
                value,
                name,
            },
        });

        Object.defineProperty(event, 'persist', {
            writable: false,
            value: () => null,
        });

        callback(value);
        onChange(event);
    }
}