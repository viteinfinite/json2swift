var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var json2swift = require('../main');
var allWriters = require('../writers');

describe('writers', function() {
	describe('The parseDocument function', function() {

		var writers;

		context('given the argo writer', function() {

			beforeEach(function() {
				writers = [allWriters.base, allWriters.argo];
			});

			it('should convert a JSON object containing an unsigned integer', function() {
				var sourceJSON = {"uinteger": 3};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/argo-uint.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an optional', function() {
				var sourceJSON = {"optional": null};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/argo-optional.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an integer and a string', function() {
				var sourceJSON = {"integer": -3, "string": "aString"};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/argo-int-string.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an array of strings', function() {
				var sourceJSON = {"array": ["a", "b", "c"]};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/argo-arrayOfStrings.swift", 'utf8');
				result.should.equal(expectedResult);
			});
		});


		context('given the class writer', function() {

			beforeEach(function() {
				writers = [allWriters.base, allWriters.class];
			});

			it('should convert a JSON object containing an unsigned integer', function() {
				var sourceJSON = {"uinteger": 3};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/class-uint.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an integer and a string', function() {
				var sourceJSON = {"integer": -3, "string": "aString"};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/class-int-string.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an array of strings', function() {
				var sourceJSON = {"array": ["a", "b", "c"]};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/class-arrayOfStrings.swift", 'utf8');
				result.should.equal(expectedResult);
			});
		});
	});
});

