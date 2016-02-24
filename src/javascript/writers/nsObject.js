module.exports = {	

	superClasses: ["NSObject"],

	writeEntityHeader: function() { 
		return "import Foundation\n\n" 
	},

	writeOpenImplementation: function(entity) {
		return "class " + entity.name.capitalizeFirstLetter()
	},

	writeInitAfterBody: function(entity) {
		return "\t\tsuper.init()\n"
	}
}