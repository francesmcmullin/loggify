var minilog = require('minilog'),
    logger = minilog('test.js'),
    loggify = require('./loggify.js')(logger);
minilog.enable();

logger('testing!');

var testFunc = function(a,b,c){
  logger.info('inside some func', a,b,c);
  return a + (b*c);
}

var utilObj = {
  fun1:function(thing1, thing2){
    logger.info('aha! ' + thing1 + thing2);
    return thing1 + thing2;
  },
  fun2:function(thing1, thing2){
    logger.info('hoho! ' + thing1 + thing2);
  }
}

loggify(utilObj, 'utilObj');

utilObj.fun1(3, 4);
utilObj.fun2(7, 8);

var blah = loggify(testFunc, 'blah');
blah('thing', 88, 'blah');

var constr = function(x){
  this.myThing = x;
};

constr.prototype.haha = function(v1, v2){
  console.log('oh no!', this.myThing, v1, v2);
}

constr = loggify(constr, 'constr', 'warn');

var thing = new constr('secret');

thing.haha(1, 2);