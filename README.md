<h1 align="center">
  <br />
  <br />
  Form Select
  <br />
  <br />
  <br />
</h1>

<h5 align="center"><code>form-select</code> is an addon package to help implement <code>react-select</code> into <code>react-dynamic-form-builder</code>.</h5>
<p align="center">
  <a href="https://www.npmjs.com/package/@ninetynine/react-dynamic-form-select">
    <img src="https://badgen.net/npm/v/@ninetynine/react-dynamic-form-select" />
  </a>
  <a href="https://www.npmjs.com/package/@ninetynine/react-dynamic-form-select">
    <img src="https://badgen.net/npm/dt/@ninetynine/react-dynamic-form-select" />
  </a>
  <a href="https://www.npmjs.com/package/@ninetynine/react-dynamic-form-select">
    <img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@ninetynine/react-dynamic-form-select@latest/" />
  </a>
</p>

<br />
<br />

#### Contents
* [Installation](#installation)
* [Usage](#usage)
  * [Select](#select)
  * [Creatable](#creatable)
  * [Utility](#utility)
    * [Map](#map)
    * [Single](#single)
* [Packages](#packages)
  * [Similar](#similar)
  * [Useful](#useful)

## Installation

`form-select` can be installed with [NPM][npm] or [Yarn][yarn].

```bash
# Installing with NPM
npm i --save @ninetynine/react-dynamic-form-select
```

```bash
# Installing with Yarn
yarn add @ninetynine/react-dynamic-form-select
```

<hr />

## Usage

`form-select` is an addon package for [`react-dynamic-form-builder`][react-dynamic-form-builder] that provides a helper for [`react-select`][react-select]. Make sure you read the `react-dynamic-form-builder` [documentation][react-dynamic-form-builder] before continuing. This package currently provides: `Select` and `Creatable` which both refer to types of selects from the `react-select` [documentation][react-select].

When creating a custom render for an input be sure to pass at least the following props:

* `name`
* `placeholder`
* `value`
* `options`
* `onChange`

To pass props directly to `react-select` use the `selectProps` prop.

### Select

To use the default `Select` component simply import it and set up a custom input render.

```jsx
// Setting up a barebones form select
import React from 'react'
import Select from '@ninetynine/react-dynamic-form-select'

const options = [
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'Red' },
]

export default [
  {
    name: 'first_name',
    validationRules: ['required']
  },
  {
    name: 'last_name',
    validationRules: ['required']
  },
  {
    name: 'favourite_color',
    placeholder: 'Favourite Color',
    render: ({ name, placeholder }, value, onChange) => (
      <Select
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        selectProps={{ placeholder }}
      />
    ),
  },
]
```

<hr />

### Creatable

To use the `Creatable` component import it and set up a custom input render, and pass it options with a create promise.

```jsx
// ./forms/create-user.jsx
import React from 'react'
import { Creatable } from '@ninetynine/react-dynamic-form-select'

export default function (options, onCreate) {
  return [
    {
      name: 'first_name',
      validationRules: ['required']
    },
    {
      name: 'last_name',
      validationRules: ['required']
    },
    {
      name: 'favourite_color',
      placeholder: 'Favourite Color',
      render: ({ name, placeholder }, value, onChange) => (
        <Creatable
          name={name}
          value={value}
          onChange={onChange}
          options={options}
          selectProps={{ placeholder }}

          // Passed through for Creatable selects
          onCreate={onCreate}
        />
      ),
    },
  ]
}
```

```jsx
// ./components/create-user-modal.jsx
import React from 'react'
import axios from 'axios'

import Modal from './modal'

class CreateUserModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Red', value: 'Red' },
      ]
    }

    this.onCreate = this.onCreate.bind(this)
  }

  onCreate(label) {
    return new Promise(resolve => {
      axios
        .post('/api/favourite-color', { label })
        .then(color => {
          const { options } = this.state

          options.push(color)

          this.setState(
            { options },
            resolve
          )
        })
    })
  }

  render() {
    const { options } = this.state

    return (
      <Modal>
        <FormBuilder
          form={(
            Form(options, this.onCreate)
          )}
        />
      </Modal>
    )
  }
}

export default CreateUserModal
```
<hr />

### Utility

`form-select` also comes with some useful utilities. You can import the utilities by using `Util`:

```jsx
// Importing select utilities
import { Util } from '@ninetynine/react-dynamic-form-select'
```

To make your options work nicely with [`react-select`][react-select] it is recommended that you pipe everything into `Util.map`.
If you need to push a single option to an array of already mapped options then call `Util.single`.

#### Map

Map is used to convert options into a format that can be used with [`react-select`][react-select]. To use map pass an object with the following keys:

* `items`
* `value` (optional, default `id`)
* `label` (options, default `name`)

`items` should be an array of objects to be converted.

```jsx
// Basic mapping
import { Util } from '@ninetynine/react-dynamic-form-select'

Util.map({
  items: [
    { id: 1, name: 'blue' },
    { id: 1, name: 'red' }
  ]
})

// > [
// >   { label: 'blue', value: '1' },
// >   { label: 'red', value: '1' },
// > ]
```

```jsx
// Advanced mapping
import { Util } from '@ninetynine/react-dynamic-form-select'

Util.map({
  items: [
    { ref: 1, string: 'blue' },
    { ref: 1, string: 'red' }
  ],
  value: 'ref',
  label: 'string'
})

// > [
// >   { label: 'blue', value: '1' },
// >   { label: 'red', value: '1' },
// > ]
```

#### Single

Single should be used when pushing an item to an already mapped array of options. It has the same argument(s) as `map` with `items` swapped for `item`:

```jsx
// Basic single mapping
import { Util } from '@ninetynine/react-dynamic-form-select'

Util.single({
  item: { id: 3, name: 'yellow' },
})

// > { label: 'yellow', value: '3' }
```

```jsx
// Advanced single mapping
import { Util } from '@ninetynine/react-dynamic-form-select'

Util.single({
  item: { ref: 3, string: 'yellow' },
  value: 'ref',
  label: 'string'
})

// > { label: 'yellow', value: '3' }
```

<hr />

#### Packages

##### Similar

* [React Dynamic Form Builder][react-dynamic-form-builder]
* [React Dynamic Form Date Picker][react-dynamic-form-date-picker]
* [React Dynamic Data Table][react-dynamic-data-table]

##### Useful

* [NoOp][noop]
* [Call][call]
* [React Flex][react-flex]

[npm]: https://npmjs.com
[yarn]: https://yarnpkg.com
[react-select]: https://github.com/JedWatson/react-select
[react-dynamic-form-builder]: https://github.com/langleyfoxall/react-dynamic-form-builder
[react-dynamic-form-date-picker]: https://github.com/ninetynine/react-dynamic-form-date-picker
[react-dynamic-data-table]: https://github.com/langleyfoxall/react-dynamic-data-table
[noop]: https://github.com/ninetynine/noop
[call]: https://github.com/ninetynine/call
[react-flex]: https://github.com/ninetynine/react-flex