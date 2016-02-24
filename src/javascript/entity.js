export default class Entity {
  constructor (name, properties) {
    this.name = name
    this.properties = properties
  }

  write (writer) {
    var result = writer.writeEntityHeader(this)
    result += writer.writeOpenImplementation(this)
    result += writer.writeInterfaces()
    result += ' {\n'
    result += this.properties.map((p) =>
      writer.writeProperty(p)
    ).join('\n')
    result += '\n'
    result += writer.writeOpenInit(this)
    result += writer.writeInitBeforeBody(this)
    result += writer.writeInitBody(this)
    result += writer.writeInitAfterBody(this)
    result += writer.writeCloseInit(this)
    result += '}\n'
    result += writer.writeEntityFooter(this)
    result += writer.writeSpacer()
    return result
  }
}
