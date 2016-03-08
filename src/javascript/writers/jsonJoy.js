module.exports = {

  protocols: ['JSONJoy'],

  writeEntityHeader: function () {
    return 'import JSONJoy\n\n'
  },

  writeOpenInit: function (entity) {
    return '\n\tinit(_ decoder: JSONDecoder) throws {\n'
  },

  writeCloseInit: function (entity) {
    return '\t}\n'
  },

  writeInitBody: function (entity) {
    return entity.properties.map((p) =>
      this.writePropertyInitializer(p)
    ).join('\n') + '\n'
  },

  writePropertyInitializer (property) {
    if (property.isArray) {
      var propertyNameArray = property.name + 'Array'
      var propertyNameDecoders = property.name + 'Decoders'
      return '\t\tvar ' + propertyNameArray + ' = [' + property.type + ']()\n' +
      '\t\tguard let ' + propertyNameDecoders + ' = decoder["' + property.name + '"].array else { throw JSONError.WrongType }\n' +
      '\t\tfor decoder in ' + propertyNameDecoders + ' {\n' +
      '\t\t\t' + propertyNameArray + '.append(' + property.type + '(decoder))\n' +
      '\t\t}\n' +
      '\t\tself.' + property.name + ' = ' + propertyNameArray + '\n'
    }

    if (property.isCustomType()) {
      return '\t\tself.' + property.name + ' = try ' + property.type + '(decoder[\"' + property.name + '\"])'
    }

    return '\t\tself.' + property.name + ' = try decoder[\"' + property.name + '\"].' + this.writePropertyConverter(property)
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

    dqsdsq
  }
}
