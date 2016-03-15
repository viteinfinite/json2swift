var fs = require('fs')

var testUtils = {
  join: function (entities) {
    return entities.map((e) => e.code).join('\n')
  },

  readFixture: function (name) {
    return fs.readFileSync('test/data/' + name + '.swift', 'utf8')
  }
}

module.exports = testUtils
