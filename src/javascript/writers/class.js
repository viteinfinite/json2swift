module.exports = {

  writeOpenImplementation: function (entity) {
    return 'class ' + entity.name.capitalizeFirstLetter()
  },

  writeOpenInit: function (entity) {
    return '\n\tinit(' +
    entity.properties.map((p) =>
      this.writeParameter(p)
    ).join(', ') + ') {\n'
  },

  writeInitBody: function (entity) {
    return entity.properties.map((p) =>
      '\t\tself.' + p.name + ' = ' + p.name
    ).join('\n') + '\n'
  },

  writeCloseInit: function (entity) {
    return '\t}\n'
  },

  writeParameter: function (property) {
    return property.name + ': ' + this.writePropertyType(property)
  }
}
