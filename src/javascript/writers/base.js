module.exports = {

  basePropertyType: function (property) {
    return property.type
  },

  propertyType: function (property) {
    var result = ''
    if (property.isArray) {
      result += '[' + this.basePropertyType(property) + ']'
    } else {
      result += this.basePropertyType(property)
    }
    if (property.isOptional) {
      result += '?'
    }
    return result
  },

  entityHeader: function (entity) { return '' },

  openImplementation: function (entity) {
    return 'struct ' + entity.name.capitalizeFirstLetter()
  },

  property: function (property) {
    return '\tlet ' + property.name + ' : ' + this.propertyType(property)
  },

  statement: function (property) {
    return 'self.' + property.name + ' = ' + property.name
  },

  parameter: function (property) {
    return property.name + ': ' + this.propertyType(property)
  },

  openInit: function (entity) { return '' },

  initBeforeBody: function (entity) { return '' },

  initBody: function (entity) { return '' },

  initAfterBody: function (entity) { return '' },

  closeInit: function (entity) { return '' },

  entityFooter: function (entity) { return '' },

  spacer: function () { return '' }
}
