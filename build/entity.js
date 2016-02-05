"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
	function Entity(name, properties) {
		_classCallCheck(this, Entity);

		this.name = name;
		this.properties = properties;
	}

	_createClass(Entity, [{
		key: "write",
		value: function write(writer) {
			var result = writer.writeEntityHeader(this);
			result += writer.writeOpenDeclaration(this);
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var property = _step.value;

					result += writer.writeProperty(property) + "\n";
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			result += writer.writeOpenInit(this);
			result += writer.writeInitBeforeBody(this);
			result += writer.writeInitBody(this);
			result += writer.writeInitAfterBody(this);
			result += writer.writeCloseInit(this);
			result += writer.writeCloseDeclaration(this);
			result += writer.writeEntityFooter(this);
			result += writer.writeSpacer();
			return result;
		}
	}]);

	return Entity;
}();

exports.default = Entity;