module.exports = {

  superClasses: ['Object'],

  writeBasePropertyType: function (property) {
    return property.isUInt() ? 'Int' : property.type
  },

  writePropertyType: function (property) {
    if (property.isArray) {
      return 'List<' + this.writeBasePropertyType(property) + '>'
    }

    if (property.isNumber()) {
      if (property.isOptional) {
        return 'RealmOptional<' + this.writeBasePropertyType(property) + '>'
      }
      return this.writeBasePropertyType(property)
    }

    if (property.isOptional) {
      return this.writeBasePropertyType(property) + '?'
    }

    return this.writeBasePropertyType(property)
  },

  writeDefaultValue: function (property) {
    if (property.isOptional) {
      if (property.isNumber()) {
        return ' = RealmOptional<' + this.writeBasePropertyType(property) + '>()'
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
      return ' = List<' + this.writeBasePropertyType(property) + '>()'
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

  writeEntityHeader: function () {
    return 'import RealmSwift\n\n'
  },

  writeOpenImplementation: function (entity) {
    return 'class ' + entity.name.capitalizeFirstLetter()
  },

  writeProperty: function (property) {
    if (property.isArray) {
      return '\tlet ' + property.name + ' : ' + this.writePropertyType(property) + this.writeDefaultValue(property)
    }
    return '\tdynamic var ' + property.name + ' : ' + this.writePropertyType(property) + this.writeDefaultValue(property)
  }
}
