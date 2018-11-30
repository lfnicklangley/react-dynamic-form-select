import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/lib/Creatable';

import Util from './util';

class FormSelect extends React.Component {
    constructor(props) {
        super(props);

        const { value, options } = props;

        this.state = {
            loading: false,
            index: Util.findIndex(value, options),
        };

        this.internalSelect = this.internalSelect.bind(this);
        this.internalCreate = this.internalCreate.bind(this);
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

    internalSelect({ value }) {
        const { options } = this.props;

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

    internalCreate(value) {
        const { onCreate, form } = this.props;

        this.setState({ loading: true }, () => {
            onCreate(value, form)
                .then(value => this.internalSelect(value))
                .catch(error => console.warn(error))
                .finally(() => this.setState({ loading: false }));
        });
    }

    render() {
        const { options, selectProps } = this.props;
        const { loading, index } = this.state;

        return (
            <Select
                isDisabled={loading}
                isLoading={loading}
                options={options}
                value={index > -1 ? options[index] : null}
                onChange={this.internalSelect}
                onCreateOption={this.internalCreate}
                {...selectProps}
            />
        );
    }
}

FormSelect.defaultProps = {
    options: [],
    name: 'select',
    value: null,
    onChange: () => null,
    onCreate: () => new Promise(resolve => setTimeout(() => resolve(), 2000)),
    selectProps: {},
    form: null,
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
    onCreate: PropTypes.func,
    selectProps: PropTypes.object,
    form: PropTypes.shape({
        form: PropTypes.object,
        validation_errors: PropTypes.object,
    }),
};

export default FormSelect;
