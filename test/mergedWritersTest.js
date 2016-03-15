var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var u = require('./testUtils.js')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('Given the writer composition', function () {

  describe ('The mergeWriters function', function () {

    it ('should merge a single protocol', function () {
      var aWriter = {'protocols': ['a']}
      var merged = allWriters.mergeWriters([aWriter])
      assert.include(merged.protocols, 'a')
    })

    it ('should merge two protocols', function () {
      var aWriter = {'protocols': ['a']}
      var anotherWriter = {'protocols': ['b']}
      var merged = allWriters.mergeWriters([aWriter, anotherWriter])
      assert.include(merged.protocols, 'a')
      assert.include(merged.protocols, 'b')
    })

    it ('should merge two superClasses', function () {
      var aWriter = {'superClasses': ['a']}
      var anotherWriter = {'superClasses': ['b']}
      var merged = allWriters.mergeWriters([aWriter, anotherWriter])
      assert.include(merged.superClasses, 'a')
      assert.include(merged.superClasses, 'b')
    })

    it ('should write superClasses and protocols', function () {
      var aWriter = {'superClasses': ['a']}
      var anotherWriter = {'protocols': ['b']}
      var merged = allWriters.mergeWriters([aWriter, anotherWriter])
      merged.writeInterfaces().should.equal(' : a, b')
    })

    it ('should write superClasses and protocols in order', function () {
      var aWriter = {'superClasses': ['a']}
      var anotherWriter = {'protocols': ['b']}
      var merged = allWriters.mergeWriters([anotherWriter, aWriter])
      merged.writeInterfaces().should.equal(' : a, b')
    })
  })

  describe ('The parseDocument function', function () {

    var writers

    context ('given a merged writer composed of NSObject and unbox', function () {

      beforeEach(function () {
        writers = [allWriters.base, allWriters.class, allWriters.nsObject, allWriters.unbox]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('nsobject-unbox-uint'))
      })

      it ('should convert a JSON containing a nested object', function () {
        var sourceJSON = {'nested': {'uinteger': 3}}
        var result = u.join(json2swift.parseDocument(sourceJSON, writers))
        result.should.equal(u.readFixture('nsobject-unbox-nested'))
      })
    })
  })
})

