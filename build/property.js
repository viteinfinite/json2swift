"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Property = function () {
	function Property(name, value) {
		_classCallCheck(this, Property);

		this.name = name;
		this.type = this.resolveType(value);
	}

	_createClass(Property, [{
		key: "resolveType",
		value: function resolveType(value) {
			if (typeof value == "string") {
				return "String";
			} else if (typeof value == "number") {
				if (String(value).indexOf(".") != -1) {
					return "Float";
				}
				if (value < 0) {
					return "Int";
				}
				return "UInt";
			} else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
				if (Array.isArray(value)) {
					if (value.length > 0) {
						return "[" + this.resolveType(value[0]) + "]";
					} else {
						return "[" + this.name.capitalizeFirstLetter() + "]";
					}
				} else {
					return this.name.capitalizeFirstLetter();
				}
			}
		}
	}]);

	return Property;
}();

exports.default = Property;