var loader = require('./lib/deprecated/loader');
var substitutor = require('./lib/deprecated/substitute');

function deprecated(msg, parameters) {
  console.warn(msg, parameters || []);
}

module.exports = {
  load: function() {
    deprecated('load middleware is deprecated, please use compiler');
    loader.apply(this, arguments);
  },
  substitute: function() {
    deprecated('substitute middleware is deprecated, please use compiler');
    substitute.apply(this, arguments);
  }
}

module.exports.compiler = require('./lib');
module.exports.load = require('./lib/load');
module.exports.ConverterMap = require('./lib/converter-map');
