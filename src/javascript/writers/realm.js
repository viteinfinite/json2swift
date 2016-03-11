module.exports = {

  superClasses: ['Object'],

  writePropertyType: function (property) {
    var normalizedType = property.isUInt() ? 'Int' : property.type

    if (property.isArray) {
      return 'List<' + normalizedType + '>'
    }

    if (property.isNumber()) {
      if (property.isOptional) {
        return 'RealmOptional<' + normalizedType + '>'
      }
      return normalizedType
    }

    if (property.isOptional) {
      return normalizedType + '?'
    }

    return normalizedType
  },

  writeDefaultValue: function (property) {
    var normalizedType = property.isUInt() ? 'Int' : property.type

    if (property.isOptional) {
      if (property.isNumber()) {
        return ' = RealmOptional<' + normalizedType + '>()'
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
      return ' = List<' + normalizedType + '>()'
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
