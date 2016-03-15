var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('The JSONJoy writer', function () {

  var writers = [allWriters.base, allWriters.jsonJoy]

  context ('given a parsed JSON', function () {

    it ('should convert a JSON containing an unsigned integer', function () {
      var sourceJSON = {'uinteger': 3}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-uint'))
    })

    it ('should convert a JSON containing a boolean', function () {
      var sourceJSON = {'boolean': false}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-bool'))
    })

    it ('should convert a JSON containing a double', function () {
      var sourceJSON = {'double': 0.5}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-double'))
    })

    it ('should convert a JSON containing a string', function () {
      var sourceJSON = {'string': 'aString'}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-string'))
    })

    it ('should convert a JSON containing an integer', function () {
      var sourceJSON = {'integer': -1}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-int'))
    })

    it ('should convert a JSON containing a nested array', function () {
      var sourceJSON = {'nested': [{'uinteger': 3}]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-nestedArray'))
    })

    it ('should convert a JSON containing a nested array of doubles', function () {
      var sourceJSON = {'nested': [0.5, 0.6]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-nestedArrayOfDoubles'))
    })

    it ('should convert a JSON containing a nested array of strings', function () {
      var sourceJSON = {'nested': ['aString']}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-nestedArrayOfStrings'))
    })

    it ('should convert a JSON containing a nested array of bools', function () {
      var sourceJSON = {'nested': [true]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-nestedArrayOfBools'))
    })

    it ('should convert a JSON containing a nested array of unsigned integers', function () {
      var sourceJSON = {'nested': [3]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-nestedArrayOfUInts'))
    })

    it ('should convert a JSON containing a nested array of integers', function () {
      var sourceJSON = {'nested': [-3]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-nestedArrayOfInts'))
    })

    it ('should convert a JSON containing a nested object', function () {
      var sourceJSON = {'nested': {'uinteger': 3}}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('jsonjoy-nestedObject'))
    })
  })
})

