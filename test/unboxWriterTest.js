var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('The unbox writer', function () {

  var writers = [allWriters.base, allWriters.unbox]

  context ('given a parsed JSON', function () {

    it ('should convert a JSON containing an unsigned integer', function () {
      var sourceJSON = {'uinteger': 3}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('unbox-uint'))
    })

    it ('should convert a JSON containing a nested object', function () {
      var sourceJSON = {'nested': {'uinteger': 3}}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('unbox-nested'))
    })
  })
})

