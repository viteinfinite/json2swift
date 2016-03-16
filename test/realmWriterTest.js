var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('The Realm writer', function () {

  var writers = [allWriters.base, allWriters.realm]

  context ('given a parsed JSON', function () {

    it ('should convert a JSON containing an unsigned integer', function () {
      var sourceJSON = {'uinteger': 3}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-uint'))
    })

    it ('should convert a JSON containing a boolean', function () {
      var sourceJSON = {'boolean': false}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-bool'))
    })

    it ('should convert a JSON containing a nested array', function () {
      var sourceJSON = {'nested': [{'uinteger': 3}]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-nestedArray'))
    })

    it ('should convert a JSON containing a nested array of doubles', function () {
      var sourceJSON = {'nested': [0.5, 0.6]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-nestedArrayOfDoubles'))
    })

    it ('should convert a JSON containing a nested array of custom objects', function () {
      var sourceJSON = {'nested': [{'key': 'value'}]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-nestedArrayOfCustomObjects'))
    })

    it ('should convert a JSON containing a nested object', function () {
      var sourceJSON = {'nested': {'uinteger': 3}}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-nestedObject'))
    })

    it ('should convert a JSON containing a string', function () {
      var sourceJSON = {'string': 'aString'}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-string'))
    })

    it ('should convert a JSON containing a double', function () {
      var sourceJSON = {'double': 0.5}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('realm-double'))
    })
  })
})

