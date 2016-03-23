import Property from './property.js'
import Entity from './entity.js'
import writers from './writers'

// Parsing

var parser = {

  parseNode: function (node, name, visitableNodeNames, entities) {
    if (visitableNodeNames.indexOf(name) !== -1) {
      return
    }

    while (Array.isArray(node)) {
      node = node[0]
    }

    if (node === null || typeof node !== 'object') {
      return
    }

    visitableNodeNames.push(name)
    var properties = []

    const keys = Object.keys(node)

    for (let key of keys) {
      const keyName = String(key)
      const value = node[key]
      properties.push(new Property(keyName, value))
      if (typeof value === 'object') {
        parser.parseNode(value, keyName, visitableNodeNames, entities)
      }
    }

    const entityName = name || 'Root'
    entities.push(new Entity(entityName, properties))
  },

  parseDocument: function (document, appliedWriters) {
    var visitableNodeNames = []
    var entities = []

    parser.parseNode(document, null, visitableNodeNames, entities)

    var writer = writers.mergeWriters(appliedWriters)
    return entities.map((e) =>
      ({'name': e.name, 'code': e.write(writer)})
    )
  }
}

module.exports = parser
