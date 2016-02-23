module.exports = {	

	mergeWriters: function(settings) {
		var mergedWriter = {};
		settings.forEach(function(setting) {
			for (var fn in setting) {
				mergedWriter[fn] = setting[fn];
			}
		});
		return mergedWriter;
	},

	base: {

		writePropertyType: function(property) {
			var result = ""
			if (property.isArray) {
				result += "[" + property.type + "]";
			} else {
				result += property.type;
			}
			if (property.isOptional) {
				result += "?"
			}
			return result;
		},

		writeEntityHeader: function(entity) { return "" },

		writeOpenDeclaration: function(entity) {
			return "struct " + entity.name.capitalizeFirstLetter() + " {\n"
		},

		writeProperty: function(property) {
			return "\tlet " + property.name + " : " + this.writePropertyType(property);
		},

		writeStatement: function(property) {
			return "self." + property.name + " = " + property.name;
		},

		writeParameter: function(property) {
			return property.name + ": " + this.writePropertyType(property);
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
		
		writePropertyRune: function(index, property) {
			var rune = index == 0 ? "^" : "*"
			var runeArrow = property.isArray ? "<||" : "<|"
			runeArrow += property.isOptional ? "?" : ""
			return "<" + rune + "> j " + runeArrow + " \"" + property.name + "\""
		},

		writeEntityHeader: function() { 
			return "import Argo\n\n" 
		},

		writeEntityFooter: function(entity) { 
			var result = "\n"
			result += "extension " + entity.name + " : Decodable {\n"

			// Create
			result += "	static func create"
			result += entity.properties.map( p => "(" + p.name + ": " + this.writePropertyType(p) + ")" ).join("");
			result += " -> " + entity.name + " {\n"
			result += "\t\treturn " + entity.name + "("

			// Constructor call
			result += entity.properties.map( p => p.name + ": " + p.name ).join(", ");
			result += ")\n"
			result += "	}\n"
			result += "\n"

			// Decode
			result += "	static func decode(j: JSON) -> Decoded<" + entity.name + "> {\n"
			result += "\t\treturn self.create\n"
			result += entity.properties.map( (p, idx) => 
				"\t\t\t" + this.writePropertyRune(idx, p) + "\n"
			).join("");	
			result += "	}\n"
			result += "}\n"
			return result 
		}
	},

	class: {
		writeOpenDeclaration: function(entity) {
			return "class " + entity.name.capitalizeFirstLetter() + " {\n"
		},

		writeOpenInit: function(entity) {
			return "\n\tinit(" +
			entity.properties.map ( p =>
				this.writeParameter(p)
			).join(", ") + ") {\n"
		},

		writeInitBody: function(entity) {
			return entity.properties.map ( p =>
				"\t\tself." + p.name + " = " + p.name
			).join("\n") + "\n"
		},

		writeCloseInit: function(entity) {
			return "\t}\n";
		},

		writeParameter: function(property) {
			return property.name + ": " + this.writePropertyType(property); 
		}
	},

	nsObject: {

		writeEntityHeader: function() { 
			return "import Foundation\n\n" 
		},

		writeOpenDeclaration: function(entity) {
			return "class " + entity.name.capitalizeFirstLetter() + " : NSObject {\n"
		},

		writeInitAfterBody: function(entity) {
			return "\t\tsuper.init()\n"
		}
	}
}