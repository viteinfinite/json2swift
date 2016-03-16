export default class Entity {
  constructor (name, properties) {
    this.name = name
    this.properties = properties
  }

  write (writer) {
    var result = writer.entityHeader(this)
    result += writer.openImplementation(this)
    result += writer.interfaces()
    result += ' {\n'
    result += this.properties.map((p) =>
      writer.property(p)
    ).join('\n')
    result += '\n'
    result += writer.openInit(this)
    result += writer.initBeforeBody(this)
    result += writer.initBody(this)
    result += writer.initAfterBody(this)
    result += writer.closeInit(this)
    result += '}\n'
    result += writer.entityFooter(this)
    result += writer.spacer()
    return result
  }
}
