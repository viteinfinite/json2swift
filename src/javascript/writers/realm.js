module.exports = {

  superClasses: ['Object'],

  basePropertyType: function (property) {
    return property.isUInt() ? 'Int' : property.type
  },

  propertyType: function (property) {
    if (property.isArray) {
      return 'List<' + this.basePropertyType(property) + '>'
    }

    if (property.isNumber()) {
      if (property.isOptional) {
        return 'RealmOptional<' + this.basePropertyType(property) + '>'
      }
      return this.basePropertyType(property)
    }

    if (property.isOptional) {
      return this.basePropertyType(property) + '?'
    }

    return this.basePropertyType(property)
  },

  defaultValue: function (property) {
    if (property.isOptional) {
      if (property.isNumber()) {
        return ' = RealmOptional<' + this.basePropertyType(property) + '>()'
      }

      if (property.isBool()) {
        return ' = RealmOptional<Bool>()'
      }

      if (property.isCustomType()) {
        return '? = nil'
      }

      return ' = nil'
    }

    if (property.isArray) {
      return ' = List<' + this.basePropertyType(property) + '>()'
    }

    if (property.isNumber()) {
      return ' = 0'
    }

    if (property.isBool()) {
      return ' = false'
    }

    if (property.isString()) {
      return ' = ""'
    }

    if (property.isCustomType()) {
      return '? = nil'
    }

    return ' = nil'
  },

  entityHeader: function () {
    return 'import RealmSwift\n\n'
  },

  openImplementation: function (entity) {
    return 'class ' + entity.name.capitalizeFirstLetter()
  },

  property: function (property) {
    if (property.isArray) {
      return '\tlet ' + property.name + ' : ' + this.propertyType(property) + this.defaultValue(property)
    }
    return '\tdynamic var ' + property.name + ' : ' + this.propertyType(property) + this.defaultValue(property)
  }
}
