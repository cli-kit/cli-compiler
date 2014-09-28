function cat(req, next) {
  var opts = req.argv;
  next();
}

module.exports = cat;
