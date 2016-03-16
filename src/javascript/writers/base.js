module.exports = {

  writeBasePropertyType: function (property) {
    return property.type
  },

  writePropertyType: function (property) {
    var result = ''
    if (property.isArray) {
      result += '[' + this.writeBasePropertyType(property) + ']'
    } else {
      result += this.writeBasePropertyType(property)
    }
    if (property.isOptional) {
      result += '?'
    }
    return result
  },

  writeEntityHeader: function (entity) { return '' },

  writeOpenImplementation: function (entity) {
    return 'struct ' + entity.name.capitalizeFirstLetter()
  },

  writeSuperClasses: function () {
    return ''
  },

  writeProtocols: function () {
    return ''
  },

  writeProperty: function (property) {
    return '\tlet ' + property.name + ' : ' + this.writePropertyType(property)
  },

  writeStatement: function (property) {
    return 'self.' + property.name + ' = ' + property.name
  },

  writeParameter: function (property) {
    return property.name + ': ' + this.writePropertyType(property)
  },

  writeOpenInit: function (entity) { return '' },

  writeInitBeforeBody: function (entity) { return '' },

  writeInitBody: function (entity) { return '' },

  writeInitAfterBody: function (entity) { return '' },

  writeCloseInit: function (entity) { return '' },

  writeEntityFooter: function (entity) { return '' },

  writeSpacer: function () { return '' }
}
