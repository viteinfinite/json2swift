var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('The NSObject writer', function () {

  var writers = [allWriters.base, allWriters.class, allWriters.nsObject]

  context ('given a parsed JSON', function () {

    it ('should convert a JSON containing an unsigned integer', function () {
      var sourceJSON = {'uinteger': 3}
      var result = u.join(json2swift.parseDocument(sourceJSON, writers))
      result.should.equal(u.readFixture('nsobject-uint'))
    })
  })
})

