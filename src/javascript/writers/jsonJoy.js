module.exports = {

  protocols: ['JSONJoy'],

  writeEntityHeader: function () {
    return 'import JSONJoy\n\n'
  },

  writeProperty: function (property) {
    return '\tvar ' + property.name + ' : ' + this.writePropertyType(property)
  },

  writeOpenInit: function (entity) {
    return '\n\tinit(_ decoder: JSONDecoder) throws {\n'
  },

  writeCloseInit: function (entity) {
    return '\t}\n'
  },

  writeInitBody: function (entity) {
    return entity.properties.map((p) =>
      this.writePropertyInitializerBody(p)
    ).join('\n') + '\n'
  },

  writePropertyInitializerBody (property) {
    if (property.isArray) {
      var propertyNameArray = property.name + 'Array'
      var propertyNameDecoders = property.name + 'Decoders'
      return '\t\tvar ' + propertyNameArray + ' = [' + property.type + ']()\n' +
      '\t\tguard let ' + propertyNameDecoders + ' = decoder["' + property.name + '"].array else { throw JSONError.WrongType }\n' +
      '\t\tfor decoder in ' + propertyNameDecoders + ' {\n' +
      '\t\t\t' + propertyNameArray + '.append(' + this.writePropertyInitializer(property) + ')\n' +
      '\t\t}\n' +
      '\t\tself.' + property.name + ' = ' + propertyNameArray + '\n'
    }

    if (property.isCustomType()) {
      return '\t\tself.' + property.name + ' = try ' + property.type + '(decoder[\"' + property.name + '\"])'
    }

    return '\t\tself.' + property.name + ' = try decoder[\"' + property.name + '\"].' + this.writePropertyConverter(property)
  },

  writePropertyInitializer (property) {
    if (property.isCustomType()) {
      return 'try ' + property.type + '(decoder)'
    }

    if (property.isUInt()) {
      return 'try decoder.getUnsigned()'
    }

    if (property.isInt()) {
      return 'try decoder.getInt()'
    }

    if (property.isString()) {
      return 'try decoder.getString()'
    }

    if (property.isDouble()) {
      return 'try decoder.getDouble()'
    }

    if (property.isBool()) {
      return 'decoder.bool'
    }
  },

  writePropertyConverter (property) {
    if (property.isUInt()) {
      return 'getUnsigned()'
    }

    if (property.isInt()) {
      return 'getInt()'
    }

    if (property.isString()) {
      return 'getString()'
    }

    if (property.isDouble()) {
      return 'getDouble()'
    }

    if (property.isBool()) {
      return 'bool'
    }
  }
}
