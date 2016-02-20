import Property from './Property';
import Entity from './Entity';
import writers from './Writers';

var visitableNodeNames = [];
var entities = [];

// String prototypes

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Parsing

function parseNode(node, name) {
	if (visitableNodeNames.indexOf(name) != -1) {
		return;
	}
	
	// TODO: what if length == 0?
	while(Array.isArray(node)) {
		node = node[0];
	}

	if (typeof(node) != "object") {
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

module.exports = {
	parseDocument: function(document, appliedWriters) {
		visitableNodeNames = [];
		entities = [];

		var result = "";
		parseNode(document, null);
		
		var writer = writers.mergeWriters(appliedWriters); 
		for (var entity of entities) {
			result += entity.write(writer);
		}
		return result;
	}
}
