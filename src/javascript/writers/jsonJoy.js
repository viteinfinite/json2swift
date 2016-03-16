module.exports = {

  protocols: ['JSONJoy'],

  entityHeader: function () {
    return 'import JSONJoy\n\n'
  },

  property: function (property) {
    return '\tvar ' + property.name + ' : ' + this.propertyType(property)
  },

  openInit: function (entity) {
    return '\n\tinit(_ decoder: JSONDecoder) throws {\n'
  },

  closeInit: function (entity) {
    return '\t}\n'
  },

  initBody: function (entity) {
    return entity.properties.map((p) =>
      this.propertyInitializerBody(p)
    ).join('\n') + '\n'
  },

  propertyInitializerBody (property) {
    if (property.isArray) {
      var propertyNameArray = property.name + 'Array'
      var propertyNameDecoders = property.name + 'Decoders'
      return '\t\tvar ' + propertyNameArray + ' = [' + property.type + ']()\n' +
      '\t\tguard let ' + propertyNameDecoders + ' = decoder["' + property.name + '"].array else { throw JSONError.WrongType }\n' +
      '\t\tfor decoder in ' + propertyNameDecoders + ' {\n' +
      '\t\t\t' + propertyNameArray + '.append(' + this.propertyInitializer(property) + ')\n' +
      '\t\t}\n' +
      '\t\tself.' + property.name + ' = ' + propertyNameArray + '\n'
    }

    if (property.isCustomType()) {
      return '\t\tself.' + property.name + ' = try ' + property.type + '(decoder[\"' + property.name + '\"])'
    }

    return '\t\tself.' + property.name + ' = try decoder[\"' + property.name + '\"].' + this.propertyConverter(property)
  },

  propertyInitializer (property) {
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

  propertyConverter (property) {
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
