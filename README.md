# Loggify!

This is a small module for adding logging to things *without* cluttering
function definitions with log statements. It is my firm belief that logging and
logic should not be mixed, and that separating them will improve readability.

## Usage

Note: loggify is *not* a logging module, it is just a module for adding logging
to functions, assuming you already have some kind of logger. You could be using
Minilog, plain old console or something else, loggify does not care.

```js
// init loggify
var loggify = require('loggify')(logger); // some obj, hopefully with an 'info'
function
```

### loggify(objectOrFunction[, name, level])
You can loggify a single function, a collection of functions which are keys on
an object, or even a constructor along with functions on the prototype. The name
and level parameters are optional. The name will default to
`objectOrFunction.name` if it exists or just an empty string. The level defaults
to `info`, this needs to be a valid member function on the `logger` object you
initially passed to `loggify`.

```js
var mySuperFunc = function(a,b) {
  return a + b;
}

mySuperFunc = loggify(mySuperFunc, 'mySuperFunc', 'warn');

mySuperFunc(1,3);  // logs function entry + arguments
                   // also logs function exit + return val

var bagOFunctions = {
  'add': function(a,b){return a+b;},
  'multiply': function(a,b){return a*b;}
};

bagOFunctions = loggify(bagOFunctions, 'stuff');
            // overwrites add and multiply with loggified versions
            // defaults to 'info' log level
            // will log 'stuff.add', because that's the name supplied

var Car = function(x,y) {
  this.x = x; this.y = y;
};

Car.prototype.drive = function(distance){
  this.x = this.x + distance;
  return [this.x, this.y];
};

Car = loggify(Car, 'Car');
           // loggify the constructor and prototype functions
```
