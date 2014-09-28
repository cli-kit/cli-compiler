var path = require('path')
  , fs = require('fs')
  , util = require('util')
  , async = require('async')
  , circular = require('circular')
  , esprima = require('esprima')
  , escodegen = require('escodegen')
  , EOL = require('os').EOL;

var formats = {
  prg: 'var prg = %s;',
  pkg: 'var pkg = %s;',
  cfg: 'var cfg = %s;',
  opt: 'var opt = %s;',
  cmd: 'var cmd = %s;',
  key: '\'%s\': new %s(%s),',
}

/**
 *  Get the transformer document ast.
 */
function transformer(cb) {
  var mod = path.join(__dirname, 'transformer.js');
  fs.readFile(mod, function(err, contents) {
    cb(err, contents ? esprima.parse('' + contents) : contents);
  })
}

/**
 *  Apply transformations to the core ast and
 *  add them to an array of ast blocks.
 */
function apply(req, ast, cb) {
  var opts = req.argv
    , program = req.program
    , opts = program.options()
    , cmds = program.commands()
    , funcbody = ast.body[0].body.body;

  function extract(ast) {
    return ast.body[0];
  }

  function preamble(cb) {
    var js = 'var define = require("cli-define")' + EOL;
    js += '  , Command = define.Command' + EOL;
    js += '  , Option = define.Option' + EOL;
    js += '  , Flag = define.Flag;';
    cb(null, [esprima.parse(js)]);
  }


  // declare the prg variable
  function prg(cb) {
    var prg = program.toObject({all: true, recurse: true});
    delete prg.names;
    var js = util.format(formats.prg, circular.stringify(prg));
    funcbody.unshift(extract(
      esprima.parse('program.sections(prg.sections);')));
    funcbody.unshift(extract(
      esprima.parse('program.detail(prg.detail);')));
    funcbody.unshift(extract(
      esprima.parse('program.description(prg.description);')));
    funcbody.unshift(extract(
      esprima.parse('program.version(prg.version);')));
    funcbody.unshift(extract(
      esprima.parse('program.name(prg.name);')));
    cb(null, [esprima.parse(js)]);
  }


  // declare the pkg variable
  function pkg(cb) {
    var pkg = program.package();
    if(!pkg) return cb(null, []);
    var js = util.format(formats.pkg, circular.stringify(pkg));
    funcbody.unshift(extract(esprima.parse('program.package(pkg);')));
    cb(null, [esprima.parse(js)]);
  }

  // declare the cfg variable
  function cfg(cb) {
    var c = esprima.parse('' + req.sources.configure.data);
    // get module exports object expression
    var oe = c.body[0].expression.right;
    var js = util.format(formats.cfg, escodegen.generate(oe));
    funcbody.unshift(extract(esprima.parse('program.configure(cfg);')));
    cb(null, [esprima.parse(js)]);
  }

  function getArgMapString(map) {
    var k, v, o, s = '{', cmd;
    var out = {};
    for(k in map) {
      v = map[k];
      cmd = typeof v.commands === 'function';
      //console.dir(v);
        //console.log('item callback %s (%s)', this.name(), depth);
      function fmt(o, depth){
        //o.source = util.format(
          //formats.key,
          //o.key, o.constructor.name, circular.stringify(o))
        return o;
      }

      o = v.toObject(
        {all: true, recurse: true, item: fmt});

      //if(cmd && Object.keys(v.commands()).length) {
        //console.dir(getArgMapString(v.commands()));
        //s += 'commands: {},';
      //}
        //
        //
      out[k] = o;
      s += util.format(
        formats.key,
        o.key, o.constructor.name, circular.stringify(o))
    }

    s += '}';
    return s;
  }

  // declare the opt variable
  function opt(cb) {
    funcbody.unshift(
      extract(esprima.parse('program.options(prg.options);')));
    cb(null, []);
  }

  // declare the cmd variable
  function cmd(cb) {
    //var s = getArgMapString(cmds);
    //var js = util.format(formats.cmd, s);
    funcbody.unshift(
      extract(esprima.parse('program.commands(prg.commands);')));
    cb(null, []);
  }

  // add the transformer ast, should be at the end
  function std(cb) {
    cb(null, [ast]);
  }

  var transformations = [];
  transformations.push(preamble);

  transformations.push(prg);

  if(Object.keys(opts).length) {
    transformations.push(opt);
  }
  if(Object.keys(cmds).length) {
    transformations.push(cmd);
  }

  if(req.sources.configure) {
    transformations.push(cfg);
  }

  transformations.push(pkg);
  transformations.push(std);

  async.concatSeries(transformations, function iterator(func, cb) {
    func(cb);
  }, function(err, blocks) {
    cb(err, blocks);
  })
}

/**
 *  Flatten the transformation blocks back to a single ast.
 */
function flatten(blocks, cb) {
  // primary transformer function block
  var trast = blocks[blocks.length - 1];
  var ast = {type: trast.type, body: []};
  for(var i = 0;i < blocks.length;i++) {
    ast.body = ast.body.concat(blocks[i]);
  }
  return cb(null, ast);
}

/**
 *  Convert the ast to a javascript string.
 */
function stringify(ast, cb) {
  var opts = {format: {indent: {style: '  '}}, base: 0, indent: ''};
  var js;
  try {
    js = escodegen.generate(ast, opts);
  }catch(e) {
    return cb(e);
  }
  cb(null, js);
}

/**
 *  Transform the program definition to a javascript module.
 *
 *  The module exports a single function which may be invoked with an existing
 *  program instance, the program instance will be decorated with the data
 *  parsed during the compilation process.
 */
function transform(req, next) {
  var opts = req.argv
    , program = req.program;
  transformer(function(err, ast) {
    if(err) return next(err);
    // apply build in transformations
    apply(req, ast, function(err, blocks) {
      if(err) return next(err);
      // flatten transformation blocks
      flatten(blocks, function(err, ast) {
        if(err) return next(err);
        stringify(ast, function(err, js) {
          req.js = js;
          next();
        });
      });
    });
  });
}

module.exports = transform;
