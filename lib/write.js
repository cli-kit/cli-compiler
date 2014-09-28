function write(req, next) {
  var opts = req.argv;
  if(!opts.output) return next();
  // TODO: implement
  console.log('write to output %s', opts.output);
  next();
}

module.exports = write;
