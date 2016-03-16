module.exports = {

  openImplementation: function (entity) {
    return 'class ' + entity.name.capitalizeFirstLetter()
  },

  openInit: function (entity) {
    return '\n\tinit(' +
    entity.properties.map((p) =>
      this.parameter(p)
    ).join(', ') + ') {\n'
  },

  initBody: function (entity) {
    return entity.properties.map((p) =>
      '\t\tself.' + p.name + ' = ' + p.name
    ).join('\n') + '\n'
  },

  closeInit: function (entity) {
    return '\t}\n'
  },

  parameter: function (property) {
    return property.name + ': ' + this.propertyType(property)
  }
}
