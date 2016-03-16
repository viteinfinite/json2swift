module.exports = {

  superClasses: ['NSObject'],

  entityHeader: function () {
    return 'import Foundation\n\n'
  },

  openImplementation: function (entity) {
    return 'class ' + entity.name.capitalizeFirstLetter()
  },

  initAfterBody: function (entity) {
    return '\t\tsuper.init()\n'
  }
}
