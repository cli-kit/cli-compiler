var markzero = require('markzero');

/**
 *  Parse markdown document to tokens.
 */
function parse(req, next) {
  var opts = req.argv
    , markdown = opts.markdown
    , lexer = new markzero.Lexer()
    , tokens;

  try {
    tokens = lexer.lex(markdown);
  }catch(e) {
    return next(e);
  }

  opts.tokens = tokens;
  next();
}

module.exports = parse;
