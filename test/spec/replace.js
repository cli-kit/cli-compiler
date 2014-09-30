var expect = require('chai').expect;
var compiler = require('../..');
var mock = require('../util/mock');

var ptn = /\(mock-command\)/;

function assert(txt) {
  expect(ptn.test(txt)).to.eql(true);
}

describe('cli-compiler:', function() {
  it('should compile replace program', function(done) {
    var opts = mock.opts.replace;
    compiler(opts, function(err, req) {
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');

      assert(req.program.description().md);
      assert(req.program.description().txt);

      assert(req.program.detail().md);
      assert(req.program.detail().txt);

      var mockOption = req.program.options().mockOption
        , mockFlag = req.program.options().mockFlag;

      assert(mockOption.description().md);
      assert(mockOption.description().txt);

      assert(mockFlag.description().md);
      assert(mockFlag.description().txt);

      var mockCommand = req.program.commands().mockCommand;

      assert(mockCommand.description().md);
      assert(mockCommand.description().txt);

      assert(mockCommand.detail().md);
      assert(mockCommand.detail().txt);

      var section = req.program.sections()['mock-top-level-section'];
      assert(section.text);

      section = mockCommand.sections()['mock-command-help-section'];
      assert(section.text);

      // escaped variable
      expect(!!~section.text.indexOf('${cmd_mock_command_long}')).to.eql(true);

      done();
    });
  });
})
