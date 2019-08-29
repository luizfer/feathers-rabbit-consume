# feathers-rabbit-consume

[![Build Status](https://travis-ci.org/luizfer/feathers-rabbit-consume.png?branch=master)](https://travis-ci.org/luizfer/feathers-rabbit-consume)
[![Code Climate](https://codeclimate.com/github/luizfer/feathers-rabbit-consume/badges/gpa.svg)](https://codeclimate.com/github/luizfer/feathers-rabbit-consume)
[![Test Coverage](https://codeclimate.com/github/luizfer/feathers-rabbit-consume/badges/coverage.svg)](https://codeclimate.com/github/luizfer/feathers-rabbit-consume/coverage)
[![Dependency Status](https://img.shields.io/david/luizfer/feathers-rabbit-consume.svg?style=flat-square)](https://david-dm.org/luizfer/feathers-rabbit-consume)
[![Download Status](https://img.shields.io/npm/dm/feathers-rabbit-consume.svg?style=flat-square)](https://www.npmjs.com/package/feathers-rabbit-consume)

> 

## Installation

```
npm install feathers-rabbit-consume --save
```

## Complete Example

Here's an example of a Feathers server that uses `feathers-rabbit-consume`. 

```js
const feathers = require('@feathersjs/feathers');
const amqp = require('feathers-rabbit-consume');

// Initialize the application
const app = feathers();

// Initialize the plugin
app.configure(amqp({
    "url": "amqp://user:password@server",
    "streams": [
      {
        "exchange": {
          "name": "dummy-server",
          "type": "fanout",
          "durable": false
        },
        "queue": {
          "name": "dummy-queue",
          "service": "base/events",
          "method": "create"
        }
      }
    ]
}));
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
