function create(req, next) {
  var opts = req.argv
    , name = opts.name
    , description = opts.description
    , version = opts.version
    , pkg = opts.pkg
    , clazz;

  var defname = 'program';
  name = name || defname;
  var clazz = opts.clazz || require('cli-define').Program;
  var prg = opts.program || new clazz(name);
  if(pkg) prg.package(pkg);
  if(!opts.name && prg.package() && prg.package().name) {
    prg.name(prg.package().name);
  }
  if(version) prg.version(version);
  if(description) prg.description(description);
  req.program = prg;
  next();
}

module.exports = create;
