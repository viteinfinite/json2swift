module.exports = {	

	mergeWriters: function(settings) {
		var mergedWriter = {};
		for (var setting of settings) {
			for (var fn in setting) {
				mergedWriter[fn] = setting[fn];
			}
		}
		return mergedWriter;
	},

	base: {

		writeEntityHeader: function(entity) { return "" },

		writeOpenDeclaration: function(entity) {
			return "struct " + entity.name.capitalizeFirstLetter() + " {\n"
		},

		writeProperty: function(property) {
			return "	let " + property.name + " : " + property.type;
		},

		writeStatement: function(property) {
			return "self." + property.name + " = " + property.name;
		},

		writeParameter: function(property) {
			return property.name + ": " + property.type;
		},

		writeOpenInit: function(entity) { return ""; },

		writeInitBeforeBody: function(entity) { return ""; },

		writeInitBody: function(entity) { return ""; },

		writeInitAfterBody: function(entity) { return ""; },

		writeCloseInit: function(entity) { return ""; },

		writeCloseDeclaration: function(entity) { return "}\n" },

		writeEntityFooter: function(entity) { return "" },

		writeSpacer: function() { return "\n\n" }
	},

	argo: {
		writeEntityHeader: function() { 
			return "import Argo\n\n" 
		}
	},

	class: {
		writeOpenDeclaration: function(entity) {
			return "class " + entity.name.capitalizeFirstLetter() + " {\n"
		},

		writeOpenInit: function(entity) {
			var result = "	init(";
			var parameters = [];
			for (var property of entity.properties) {
				parameters.push(this.writeParameter(property));
			}
			result += parameters.join(", ") + ") {\n"
			return result;
		},

		writeInitBody: function(entity) {
			var result = "";
			for (var property of entity.properties) {
				result += "		self." + property.name + " = " + property.name + "\n";
			}
			return result;
		},

		writeCloseInit: function(entity) {
			return "	}\n";
		},

		writeParameter: function(property) {
			return property.name + ": " + property.type; 
		}
	},

	nsObject: {
		writeOpenDeclaration: function(entity) {
			return "class " + entity.name.capitalizeFirstLetter() + " : NSObject {\n"
		},

		writeInitBeforeBody: function(entity) {
			return "		super.init()\n"
		}
	}
}