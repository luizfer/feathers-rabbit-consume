/* eslint-disable no-undef */
const { expect } = require('chai');
const plugin = require('../lib');

describe('feathers-rabbit-consume', () => {
  it('basic functionality', () => {
    expect(typeof plugin).to.equal('function', 'It worked');
    expect(plugin()).to.equal('feathers-rabbit-consume');
  });
});
