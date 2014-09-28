function transform(req, next) {
  var opts = req.argv
    , program = req.program;
  next();
}

module.exports = transform;
