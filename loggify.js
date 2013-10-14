var emptyObj = {},
    isAFunction = function(fun){
    return fun && emptyObj.toString.call(fun) == '[object Function]';
    };

function loggifyObj(logger, obj, newObj, name, level){
  for(var key in obj){
    var fun = obj[key];
    if(Object.prototype.hasOwnProperty.call(obj, key) &&
        isAFunction(fun) ) {
      (function(key, fun){
        newObj[key] = loggifyFunc(logger, fun, name + '.' + key, level);
      })(key, fun);
    }
  }
};

function loggifyFunc(logger, fun, name, level){
  var newFunc = function(){
    logger[level]('entering', name, arguments);
    if(this instanceof arguments.callee) {
      var ret = Object.create(newFunc.prototype);
      fun.apply(ret, arguments);
    } else {
      var ret = fun.apply(this, arguments);
    }
    logger[level]('exiting', name, ret);
    return ret;
  }
  return newFunc;
}


module.exports = function(logger){
  return function(objOrFun, name, level){
    var newFun = objOrFun;
    name = name || objOrFun.name || '';
    level = level || 'info';
    if(isAFunction(objOrFun) ) {
      newFun = loggifyFunc(logger, objOrFun, name, level);
    }
    loggifyObj(logger, objOrFun, newFun, name, level);
    objOrFun.prototype && loggifyObj(logger, objOrFun.prototype, newFun.prototype, name, level);
    return newFun;
  }
}
