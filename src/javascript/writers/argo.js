module.exports = {

  writeBasePropertyType: function (property) {
    return property.isUInt() ? 'Int' : property.type
  },

  writePropertyRune: function (index, property) {
    var rune = index === 0 ? '^' : '*'
    var runeArrow = property.isArray ? '<||' : '<|'
    runeArrow += property.isOptional ? '?' : ''
    return '<' + rune + '> j ' + runeArrow + ' \"' + property.name + '\"'
  },

  writeEntityHeader: function () {
    return 'import Argo\n\n'
  },

  writeEntityFooter: function (entity) {
    var result = '\n'
    result += 'extension ' + entity.name + ' : Decodable {\n'

    // Create
    result += '\tstatic func create'
    result += entity.properties.map((p) => '(' + p.name + ': ' + this.writePropertyType(p) + ')').join('')
    result += ' -> ' + entity.name + ' {\n'
    result += '\t\treturn ' + entity.name + '('

    // Constructor call
    result += entity.properties.map((p) => p.name + ': ' + p.name).join(', ')
    result += ')\n'
    result += '\t}\n'
    result += '\n'

    // Decode
    result += '\tstatic func decode(j: JSON) -> Decoded<' + entity.name + '> {\n'
    result += '\t\treturn self.create\n'
    result += entity.properties.map((p, idx) =>
      '\t\t\t' + this.writePropertyRune(idx, p) + '\n'
    ).join('')
    result += '\t}\n'
    result += '}\n'
    return result
  }
}
