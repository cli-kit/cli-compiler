function create(req, next) {
  var opts = req.argv
    , name = opts.name
    , description = opts.description
    , version = opts.version
    , pkg = opts.pkg
    , clazz;

  name = name || 'program';
  var clazz = opts.clazz || require('cli-define').Program;
  var prg = opts.program || new clazz(name, description);
  if(pkg) prg.package(pkg);
  req.program = prg;
  next();
}

module.exports = create;
