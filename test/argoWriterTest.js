var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('The Argo writer', function () {

  var writers = [allWriters.base, allWriters.argo]

  context ('given a parsed JSON', function () {

    it ('should convert a JSON containing an unsigned integer', function () {
      var sourceJSON = {'uinteger': 3}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('argo-uint'))
    })

    it ('should convert a JSON containing an optional', function () {
      var sourceJSON = {'optional': null}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('argo-optional'))
    })

    it ('should convert a JSON containing an integer and a string', function () {
      var sourceJSON = {'integer': -3, 'string': 'aString'}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('argo-int-string'))
    })

    it ('should convert a JSON containing an array of strings', function () {
      var sourceJSON = {'array': ['a', 'b', 'c']}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('argo-arrayOfStrings'))
    })

    it ('should convert a JSON containing an array of unsigned integers', function () {
      var sourceJSON = {'array': [1, 2, 3]}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('argo-arrayOfUIntegers'))
    })
  })
})

