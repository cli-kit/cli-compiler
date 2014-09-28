var define = require('cli-define')
  , Option = define.Option
  , Command = define.Command
  , ConverterMap = require('./converter-map');

/**
 *  Merge an option or command definition with parsed program data.
 *
 *  This allows callback functions (converter/action) to be merged
 *  with the parsed definition.
 *
 *  @param arg The existing command or option definition.
 *  @param key The key for the option or command.
 *  @param definition The object to merge with the existing
 *  option.
 */
function merge(arg, key, definition) {
  if(typeof definition === 'function'
    || Array.isArray(definition)
    || (definition instanceof ConverterMap)) {

    // set converter for options
    if(arg instanceof Option) {
      arg.converter(definition);

    // set actions for commands
    }else if(arg instanceof Command) {
      arg.action(definition);
    }
  // object definition, merge into arg
  }else if(definition
    && typeof definition === 'object'
    && !Array.isArray(definition)) {

    var mutators = (arg instanceof Command) ?
      Object.keys(define.mutators.cmd) : Object.keys(define.mutators.arg);

    // cannot override calculated data
    delete definition.name;
    delete definition.key;
    delete definition.extra;
    delete definition.names;

    define.initialize.call(arg, definition, mutators);
  }
}

module.exports = merge;
