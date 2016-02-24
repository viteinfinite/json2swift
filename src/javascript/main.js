import Property from './property.js';
import Entity from './entity.js';
import writers from './writers.js';

// String prototypes

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Parsing

function parseNode(node, name, visitableNodeNames, entities) {
	if (visitableNodeNames.indexOf(name) != -1) {
		return;
	}
	
	// TODO: what if length == 0?
	while(Array.isArray(node)) {
		node = node[0];
	}

	if (node === null || typeof(node) !== "object") {
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
			parseNode(value, keyName, visitableNodeNames, entities);
		}
	}

	var entityName = name ? name : "Root";
	entities.push(new Entity(entityName, properties));
}

module.exports = {
	
	parseDocument: function(document, appliedWriters) {
		var visitableNodeNames = [];
		var entities = [];

		parseNode(document, null, visitableNodeNames, entities);
		
		var writer = writers.mergeWriters(appliedWriters); 
		return entities.map ( e =>
			e.write(writer)
		).join("")
	}
}
