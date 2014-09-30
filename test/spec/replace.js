var expect = require('chai').expect;
var compiler = require('../..');
var mock = require('../util/mock');

describe('cli-compiler:', function() {
  it('should compile replace program', function(done) {
    var opts = mock.opts.replace;
    compiler(opts, function(err, req) {
      expect(req).to.be.an('object');
      expect(req.program).to.be.an('object');
      //expect(req.program.options()).to.be.an('object');
      //expect(req.program.commands()).to.be.an('object');
      //expect(Object.keys(req.program.options())).to.eql(
        //['mockOption', 'mockFlag']);
      //expect(Object.keys(req.program.commands())).to.eql(
        //['mockCommand']);
      //expect(req.program.name()).to.eql('basic-program');
      //expect(req.program.version()).to.eql('1.0.0');
      //expect(req.program.description().txt).to.eql(
        //'A basic program description');
      //expect(req.program.description().md).to.eql(
        //'A *basic* program description');
      done();
    });
  });
})
