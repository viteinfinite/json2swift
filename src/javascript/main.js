import Property from './Property';
import Entity from './Entity';

var sourceJSON = {"pippo": 3, "topolino": "topo", "paperino": -1, "paperoga": 0.1, "campagna": [{"nome": "Nonna Papera"}, {"nome": "Ciccio"}], "paperone": {"deposito": "soldi"}, "nipoti": ["Quinno", "Quo", "Qua"]};

var visitableNodeNames = [];
var entities = [];

// String prototypes

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Settings

var BaseWriter = {

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
}

var ArgoWriter = {
	writeEntityHeader: function() { 
		return "import Argo\n\n" 
	}
}

var ClassWriter = {
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
}

var NSObjectWriter = {
	writeOpenDeclaration: function(entity) {
		return "class " + entity.name.capitalizeFirstLetter() + " : NSObject {\n"
	},

	writeInitBeforeBody: function(entity) {
		return "		super.init()\n"
	}
}

function mergeWriters(settings) {
	var mergedWriter = {};
	for (var setting of settings) {
		for (var fn in setting) {
			mergedWriter[fn] = setting[fn];
		}
	}
	return mergedWriter;
}

// Parsing

function parseNode(node, name) {
	if (visitableNodeNames.indexOf(name) != -1) {
		return;
	}
	
	// FIXME: this goes elsewhere
	// TODO: what if length == 0?
	if (Array.isArray(node) && node.length > 0) {
		node = node[0];
	}
	
	if (typeof(node) == "string") {
		return;
	}
	else if (typeof(value) == "number") {
		return;
	}
	
	visitableNodeNames.push(name);
	var properties = [];
	var keys = Object.keys(node);

	for (var index = 0; index < keys.length; index++) {
		var key = keys[index];
		var keyName = String(key);
		var value = node[key];
		properties.push(new Property(keyName, value));
		if (typeof(value) == "object") {
			parseNode(value, keyName);
		}
	}

	var entityName = name ? name : "Root";
	entities.push(new Entity(entityName, properties));
}

function parseDocument(document, writers) {
	visitableNodeNames = [];
	entities = [];

	var result = "";
	parseNode(document, null);
	
	var writer = mergeWriters(writers); 
	for (var entity of entities) {
		result += entity.write(writer);
	}
	return result;
}

console.log(parseDocument(sourceJSON, [BaseWriter, ArgoWriter, ClassWriter, NSObjectWriter]));
