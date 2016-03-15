var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('json2swift', function () {

  describe ('The parseDocument function', function () {

    var writers

    context ('given the base writer', function () {

      beforeEach (function () {
        writers = [allWriters.base]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('uint'))
      })

      it ('should convert a JSON containing a negative integer', function () {
        var sourceJSON = {'integer': -3}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('int'))
      })

      it ('should convert a JSON containing an optional', function () {
        var sourceJSON = {'optional': null}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('optional'))
      })

      it ('should convert a JSON containing a double', function () {
        var sourceJSON = {'double': 0.3}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('double'))
      })

      it ('should convert a JSON containing a boolean', function () {
        var sourceJSON = {'boolean': true}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('bool'))
      })

      it ('should convert a JSON containing a string', function () {
        var sourceJSON = {'string': 'aString'}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('string'))
      })

      it ('should convert a JSON containing an array of booleans', function () {
        var sourceJSON = {'array': [false, true]}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('arrayOfBools'))
      })

      it ('should convert a JSON containing an array of integers', function () {
        var sourceJSON = {'array': [1, 2]}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('arrayOfUIntegers'))
      })

      it ('should convert a JSON containing an array of strings', function () {
        var sourceJSON = {'array': ['1', '2']}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('arrayOfStrings'))
      })

      it ('should convert a JSON containing a nested object', function () {
        var sourceJSON = {'nestedObject': {'array': ['1', '2']}}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('nestedObject'))
      })

      it ('should convert a JSON with multiple keys', function () {
        var sourceJSON = {'array': ['1', '2'], 'uinteger': 3}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('multipleKeys'))
      })

      it ('should convert a JSON array', function () {
        var sourceJSON = [{'uinteger': 1}]
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('uint'))
      })

      it ('should convert a JSON array of arrays', function () {
        var sourceJSON = [[{'uinteger': 1}]]
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('uint'))
      })

      it ('should convert an empty array of arrays with no error', function () {
        var sourceJSON = [[]]
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal('')
      })
    })
  })
})
