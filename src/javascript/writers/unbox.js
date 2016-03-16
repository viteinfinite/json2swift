module.exports = {

  protocols: ['Unboxable'],

  entityHeader: function () {
    return 'import Unbox\n\n'
  },

  openInit: function (entity) {
    return '\n\tinit(unboxer: Unboxer) {\n'
  },

  closeInit: function (entity) {
    return '\t}\n'
  },

  initBody: function (entity) {
    return entity.properties.map((p) =>
      '\t\tself.' + p.name + ' = unboxer.unbox(\"' + p.name + '\")'
    ).join('\n') + '\n'
  }
}
