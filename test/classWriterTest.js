var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('The class writer', function () {

  var writers = [allWriters.base, allWriters.class]

  context ('given a parsed JSON', function () {

    it ('should convert a JSON containing an unsigned integer', function () {
      var sourceJSON = {'uinteger': 3}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('class-uint'))
    })

    it ('should convert a JSON containing an integer and a string', function () {
      var sourceJSON = {'integer': -3, 'string': 'aString'}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('class-int-string'))
    })

    it ('should convert a JSON containing an array of strings', function () {
      var sourceJSON = {'array': ['a', 'b', 'c']}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('class-arrayOfStrings'))
    })
  })
})

