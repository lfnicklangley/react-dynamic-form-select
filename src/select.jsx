import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Util from './util';

class FormSelect extends React.Component {
    constructor(props) {
        super(props);

        const { value, options } = props;

        this.state = {
            index: Util.findIndex(value, options),
        };

        this.internalSelect = this.internalSelect.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { options, value } = this.props;

        if (JSON.stringify(prevProps.options) !== JSON.stringify(options)) {
            let index = Util.findIndex(value, options);

            if(index === -1) {
                this.internalSelect({ value: null });
            }
        }
    }

    internalSelect(data) {
        const { options } = this.props;
        let value = null;

        if (typeof data === 'object' && data !== null) {
            value = data.value;
        }

        Util.internalSelect(
            this.props,
            value,
            () => (
                this.setState({
                    index: Util.findIndex(value, options)
                })
            )
        );
    }

    render() {
        const { options, selectProps } = this.props;
        const { index } = this.state;

        return (
            <Select
                options={options}
                value={index > -1 ? options[index] : null}
                onChange={this.internalSelect}
                {...selectProps}
            />
        );
    }
};

FormSelect.defaultProps = {
    options: [],
    name: 'select',
    value: null,
    onChange: () => null,
    selectProps: {},
};

FormSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
        })
    ),
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    selectProps: PropTypes.object,
};

export default FormSelect;
