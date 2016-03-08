var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()
var fs = require('fs')
var json2swift = require('../main.js')
var allWriters = require('../writers')

describe ('writers', function () {

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

    context ('given the argo writer', function () {

      beforeEach (function () {
        writers = [allWriters.base, allWriters.argo]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/argo-uint.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing an optional', function () {
        var sourceJSON = {'optional': null}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/argo-optional.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing an integer and a string', function () {
        var sourceJSON = {'integer': -3, 'string': 'aString'}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/argo-int-string.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing an array of strings', function () {
        var sourceJSON = {'array': ['a', 'b', 'c']}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/argo-arrayOfStrings.swift', 'utf8')
        result.should.equal(expectedResult)
      })
    })

    context ('given the class writer', function () {

      beforeEach (function () {
        writers = [allWriters.base, allWriters.class]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/class-uint.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing an integer and a string', function () {
        var sourceJSON = {'integer': -3, 'string': 'aString'}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/class-int-string.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing an array of strings', function () {
        var sourceJSON = {'array': ['a', 'b', 'c']}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/class-arrayOfStrings.swift', 'utf8')
        result.should.equal(expectedResult)
      })
    })

    context ('given the NSObject writer', function () {

      beforeEach (function () {
        writers = [allWriters.base, allWriters.class, allWriters.nsObject]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/nsobject-uint.swift', 'utf8')
        result.should.equal(expectedResult)
      })
    })

    context ('given the unbox writer', function () {

      beforeEach (function () {
        writers = [allWriters.base, allWriters.unbox]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/unbox-uint.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested object', function () {
        var sourceJSON = {'nested': {'uinteger': 3}}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/unbox-nested.swift', 'utf8')
        result.should.equal(expectedResult)
      })
    })

    context ('given a merged writer composed of NSObject and unbox', function () {

      beforeEach(function () {
        writers = [allWriters.base, allWriters.class, allWriters.nsObject, allWriters.unbox]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/nsobject-unbox-uint.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested object', function () {
        var sourceJSON = {'nested': {'uinteger': 3}}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/nsobject-unbox-nested.swift', 'utf8')
        result.should.equal(expectedResult)
      })
    })

    context ('given the Realm writer', function () {

      beforeEach(function () {
        writers = [allWriters.base, allWriters.realm]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/realm-uint.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a boolean', function () {
        var sourceJSON = {'boolean': false}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/realm-bool.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested array', function () {
        var sourceJSON = {'nested': [{'uinteger': 3}]}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/realm-nestedArray.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested array of doubles', function () {
        var sourceJSON = {'nested': [0.5, 0.6]}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/realm-nestedArrayOfDoubles.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested object', function () {
        var sourceJSON = {'nested': {'uinteger': 3}}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/realm-nestedObject.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a string', function () {
        var sourceJSON = {'string': 'aString'}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/realm-string.swift', 'utf8')
        result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a double', function () {
        var sourceJSON = {'double': 0.5}
        var result = json2swift.parseDocument(sourceJSON, writers)
        var expectedResult = fs.readFileSync('test/data/realm-double.swift', 'utf8')
        result.should.equal(expectedResult)
      })
    })

    context ('given the JSONJoy writer', function () {

      beforeEach(function () {
        writers = [allWriters.base, allWriters.jsonJoy]
      })

      it ('should convert a JSON containing an unsigned integer', function () {
        var sourceJSON = {'uinteger': 3}
        var result = json2swift.parseDocument(sourceJSON, writers)
        console.log(result)
        // var expectedResult = fs.readFileSync('test/data/realm-uint.swift', 'utf8')
        // result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a boolean', function () {
        var sourceJSON = {'boolean': false}
        var result = json2swift.parseDocument(sourceJSON, writers)
        console.log(result)
        // var expectedResult = fs.readFileSync('test/data/realm-bool.swift', 'utf8')
        // result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested array', function () {
        var sourceJSON = {'nested': [{'uinteger': 3}]}
        var result = json2swift.parseDocument(sourceJSON, writers)
        console.log(result)
        // var expectedResult = fs.readFileSync('test/data/realm-nestedArray.swift', 'utf8')
        // result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested array of doubles', function () {
        var sourceJSON = {'nested': [0.5, 0.6]}
        var result = json2swift.parseDocument(sourceJSON, writers)
        console.log(result)
        // var expectedResult = fs.readFileSync('test/data/realm-nestedArrayOfDoubles.swift', 'utf8')
        // result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a nested object', function () {
        var sourceJSON = {'nested': {'uinteger': 3}}
        var result = json2swift.parseDocument(sourceJSON, writers)
        console.log(result)
        // var expectedResult = fs.readFileSync('test/data/realm-nestedObject.swift', 'utf8')
        // result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a string', function () {
        var sourceJSON = {'string': 'aString'}
        var result = json2swift.parseDocument(sourceJSON, writers)
        console.log(result)
        // var expectedResult = fs.readFileSync('test/data/realm-string.swift', 'utf8')
        // result.should.equal(expectedResult)
      })

      it ('should convert a JSON containing a double', function () {
        var sourceJSON = {'double': 0.5}
        var result = json2swift.parseDocument(sourceJSON, writers)
        console.log(result)
        // var expectedResult = fs.readFileSync('test/data/realm-double.swift', 'utf8')
        // result.should.equal(expectedResult)
      })
    })
  })
})

