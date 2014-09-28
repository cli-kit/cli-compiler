function print(req, next) {
  var opts = req.argv;
  if(opts.print === false) return next();
  process.stdout.write(req.js);
  next();
}

module.exports = print;
