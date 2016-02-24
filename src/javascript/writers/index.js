module.exports = {

	mergeWriters: function(writers) {
		var mergedWriter = {
			superClasses: [],
			protocols: [],
			writeInterfaces: function() {
				var interfaces = this.superClasses.concat(this.protocols);
				if (interfaces.length == 0) {
					return "";
				}
				return " : " + interfaces.join(", ")
			}
		};
		
		writers.forEach(function(writer) {
			for (var fn in writer) {
				if (typeof(writer[fn]) !== "function") {
					continue;
				}
				mergedWriter[fn] = writer[fn];
			}

			if (Array.isArray(writer.superClasses)) {
				mergedWriter.superClasses = mergedWriter.superClasses.concat(writer.superClasses);
			}

			if (Array.isArray(writer.protocols)) {
				mergedWriter.protocols = mergedWriter.protocols.concat(writer.protocols);
			}
		});
		return mergedWriter;
	}
};

module.exports.base = require("./base.js");
module.exports.class = require("./class.js");
module.exports.nsObject = require("./nsObject.js");
module.exports.argo = require("./argo.js");
module.exports.unbox = require("./unbox.js");
