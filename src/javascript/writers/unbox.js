module.exports = {	

	protocols: ["Unboxable"],

	writeEntityHeader: function() { 
		return "import Unbox\n\n" 
	},

	writeOpenInit: function(entity) {
		return "\n\tinit(unboxer: Unboxer) {\n"
	},

	writeCloseInit: function(entity) {
		return "\t}\n";
	},

	writeInitBody: function(entity) {
		return entity.properties.map ( p =>
			"\t\tself." + p.name + " = unboxer.unbox(\"" + p.name + "\")"
		).join("\n") + "\n"
	},
}