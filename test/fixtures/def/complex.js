var types = require('cli-types');
var ConverterMap = require('cli-converter-util').ConverterMap;

module.exports = {
  commands: {
    mockCommand: {
      options: {
        mockCommandOption: types.integer,
      }
    },
    //uuids: {
      //options: {
        //count: types.integer
      //}
    //}
  },
  options: {
    mockOption: types.file('-f'),
    mockCommand: new ConverterMap({
      default: types.resource('-f', true, ['json', 'js']),
      att: types.resource('-f', true),
      app: types.resource('-f', true)
    }),
  }
}
