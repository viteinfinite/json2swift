var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var fs = require('fs');
var json2swift = require('../main');
var allWriters = require('../writers');

describe('json2swift', function() {
	describe('The parseDocument function', function() {

		var writers;

		context('given the base writer', function() {

			beforeEach(function() {
				writers = [allWriters.base];
			});

			it('should convert a JSON object containing an unsigned integer', function() {
				var sourceJSON = {"uinteger": 3};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/uint.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing a negative integer', function() {
				var sourceJSON = {"integer": -3};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/int.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing a float', function() {
				var sourceJSON = {"float": 0.3};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/float.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing a boolean', function() {
				var sourceJSON = {"boolean": true};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/bool.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing a string', function() {
				var sourceJSON = {"string": "aString"};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/string.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an array of booleans', function() {
				var sourceJSON = {"array": [false, true]};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/arrayOfBooleans.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an array of integers', function() {
				var sourceJSON = {"array": [1, 2]};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/arrayOfUIntegers.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing an array of strings', function() {
				var sourceJSON = {"array": ["1", "2"]};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/arrayOfStrings.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object containing a nested object', function() {
				var sourceJSON = {"nestedObject": { "array": ["1", "2"]}};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/nestedObject.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON object with multiple keys', function() {
				var sourceJSON = {"array": ["1", "2"], "uinteger": 3};
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/multipleKeys.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON array', function() {
				var sourceJSON = [{"uinteger": 1}];
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/uint.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert a JSON array of arrays', function() {
				var sourceJSON = [[{"uinteger": 1}]];
				var result = json2swift.parseDocument(sourceJSON, writers);
				var expectedResult = fs.readFileSync("test/data/uint.swift", 'utf8');
				result.should.equal(expectedResult);
			});

			it('should convert an empty array of arrays with no error', function() {
				var sourceJSON = [[]];
				var result = json2swift.parseDocument(sourceJSON, writers);
				result.should.equal("");
			});
		});

	});
});

				// var sourceJSON = {"pippo": 3, "topolino": "topo", "paperino": -1, "paperoga": 0.1, "campagna": [{"nome": "Nonna Papera"}, {"nome": "Ciccio"}], "paperone": {"deposito": "soldi"}, "nipoti": ["Quinno", "Quo", "Qua"]};
				// var result = json2swift.parseDocument(sourceJSON, [json2swift.writers.base, json2swift.writers.argo, json2swift.writers.class, json2swift.writers.nsObject]);


