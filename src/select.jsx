import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import * as Util from '@ninetynine/util/util';

const FormSelect = ({ options, name, value, onChange }) => {
    const onInternalChange = ({ value }) => {
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

        onChange(event);
    };

    const index = options.findIndex(option => option.id === value);

    return (
        <Select
            value={Util.isNumber(index) ? options[index] : null}
            options={options}
            onChange={onInternalChange}
        />
    );
};

FormSelect.defaultProps = {
    options: [],
    name: 'select',
    value: null,
    onChange: () => null,
};

FormSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
        })
    ),
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
};

export default FormSelect;
