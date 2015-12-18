
var test = require('tape');
var last = require('../src/es5/last');

test('apply', function (t) {

  var expected = ["a",1];
  var fn = function(ltr,num){

    t.equal(ltr, expected[0], "pass arguments");
    t.equal(num, expected[1], "pass arguments");


    return num + num;
  };

  var result = last.apply(fn, expected);

  t.equal(result, expected[1] + expected[1], "return functions called value");

  t.end();
});

test('compose', function (t) {
  
  var add = function(num){ return num + num; };
  var sqr = function(num){ return num * num; };

  var expected = 18;
  var fn = last.compose(add, sqr);
  var result = fn(3);
  t.equal(result, expected, "compose functions");

  fn = last.compose(sqr, add, add);
  expected = 144;
  result = fn(3);
  t.equal(result, expected, "compose functions");

  t.end();
});

test('concat', function (t) {

  var empty = last.concat();
  t.looseEqual(empty, [], "no arguments return array");


  var a = 123;
  var b = "456";

  var expected = [123, "456"];
  var result = last.concat(a, b);
  t.looseEqual(result, expected, "concat arguments into array");

  var c = [1,3,5];
  var d = [7,9,11,13];

  expected = [1,3,5,7,9,11,13];
  result = last.concat(c, d);
  t.looseEqual(result, expected, "concat arrays into array");

  t.end();

});

test('contains', function (t) {

  var empty = last.contains();
  t.equal(empty, false, "no arguments return false");

  var d = [7,9,11,13];

  var expected = false;
  var result = last.contains(5, d);
  t.equal(result, expected, "false if not found");

  expected = true;
  result = last.contains(9, d);
  t.equal(result, expected, "true if found");

  t.end();

});

test('clone', function (t) {

  var empty = last.clone();
  t.notOk(empty, "no arguments return undefined");

  var expected = [7,9,11,13];

  var result = last.clone(expected);
  t.looseEqual(result, expected, "clone array");
  t.notEqual(result, expected, "makes a copy");

  expected = {"a":7,"b":9,"c":11,"d":13};

  result = last.clone(expected);

  t.looseEqual(result, expected, "clone object");
  t.notEqual(result, expected, "makes a copy");

  t.end();

});


test('empty', function (t) {

  var empty = last.empty();
  t.equal(empty, true, "no arguments return true");

  empty = last.empty(null);
  t.equal(empty, true, "null return true");

  var arr = last.empty([]);
  t.equal(arr, true, "arrays with no length return true");

  var str = last.empty("");
  t.equal(str, true, "strings with no length return true");

  var obj = last.empty({});
  t.equal(obj, true, "objects with no keys return true");

  var num = last.empty(0);
  t.equal(num, true, "numbers equal to zero return true");

  arr = last.empty([1,2]);
  t.equal(arr, false, "arrays with length return false");

  str = last.empty(" ");
  t.equal(str, false, "strings with length return false");

  obj = last.empty({"key": 1});
  t.equal(obj, false, "objects with keys return false");

  num = last.empty(-1);
  t.equal(num, false, "negative numbers return false");

  num = last.empty(1);
  t.equal(num, false, "positive numbers return false");

  num = last.empty(Infinity);
  t.equal(num, false, "Nan numbers return false");

  num = last.empty(NaN);
  t.equal(num, true, "Nan numbers return true");

  var bool = last.empty(true);
  t.equal(bool, false, "boolean true return false");

  t.end();

});

test('identity', function (t) {

  var expected = [2];
  t.equal(last.identity(expected), expected, "returns itself");
  t.end();
});


test('difference', function (t) {

  var empty = last.difference();
  t.looseEqual(empty, [], "no arguments return array");

  var a = [7,9,11,13];
  var b = [9,13];

  var expected = [7,11];

  var result = last.difference(a, b);

  t.looseEqual(result, expected, "return unique values found in first NOT in second");

  t.end();

});

test('filter', function (t) {

  var empty = last.filter();
  t.looseEqual(empty, [], "no arguments return array");

  var a = [7,9,11,13];

  var prd = function(i){ return i > 10; };

  var expected = [11,13];

  var result = last.filter(prd, a);

  t.looseEqual(result, expected, "filter array with function");

  t.end();

});

test('indexOf', function (t) {

  var empty = last.indexOf();
  t.equal(empty, -1, "no arguments return -1");

  var d = ["a","x","e"];

  var expected = -1;
  var result = last.indexOf("s", d);
  t.equal(result, expected, "-1 if not found");

  expected = 2;
  result = last.indexOf("e", d);
  t.equal(result, expected, "index if found");

  t.end();

});


test('intersection', function (t) {

  var empty = last.intersection();
  t.looseEqual(empty, [], "no arguments return array");

  var a = [7,9,11,13];
  var b = [9,13];

  var expected = [9,13];
  var result = last.intersection(a, b);
  t.looseEqual(result, expected, "find items in common");

  result = last.intersection(b, a);
  t.looseEqual(result, expected, "find items in common");

  result = last.intersection(b, ["a"]);
  expected = [];
  t.looseEqual(result, expected, "find items in common");

  t.end();

});

test('map', function (t) {

  var empty = last.map();
  t.looseEqual(empty, [], "no arguments return array");

  var a = [7,9,11,13];

  var prd = function(i){ return i + 10; };

  var expected = [17,19,21,23];

  var result = last.map(prd, a);

  t.looseEqual(result, expected, "map items through function");
  t.looseEqual(a, [7,9,11,13], "original objects not mutated");
  t.end();

});

test('merge', function (t) {

  var empty = last.merge();
  t.looseEqual(empty, {}, "no arguments return empty object");

  var a = {"a":7,"b":9,"c":0};
  var b = {"c":11,"d":13};

  var expected = {"a":7,"b":9,"c":11,"d":13};

  var result = last.merge(a, b);
  t.looseEqual(result, expected, "merges objects, second taking precedent");

  t.looseEqual(a, {"a":7,"b":9,"c":0}, "original objects not harmed");
  t.looseEqual(b, {"c":11,"d":13}, "original objects not harmed");

  t.end();

});

test('mergeAll', function (t) {

  var empty = last.mergeAll();
  t.looseEqual(empty, {}, "no arguments return empty object");

  var arr = [{"a":7,"b":9,"c":0}, {"c":11,"d":13}, {"a":16,"c":"c"}];

  var expected = {"a":16,"b":9,"c":"c","d":13};

  var result = last.mergeAll(arr);
  t.looseEqual(result, expected, "merges objects, later taking precedent");

  t.looseEqual(arr, [{"a":7,"b":9,"c":0}, {"c":11,"d":13}, {"a":16,"c":"c"}], "original objects not harmed");

  t.end();
});

test('omit', function (t) {

  var empty = last.omit();
  t.looseEqual(empty, [], "no arguments return array");

  var arr = ["a","b","c","a"];

  var expected = ["b","c"];

  var result = last.omit("a", arr);
  t.looseEqual(result, expected, "removes items");
  t.looseEqual(arr, ["a","b","c","a"], "original objects not harmed");

  t.end();
});

test('omitAny', function (t) {

  var empty = last.omitAny();
  t.looseEqual(empty, [], "no arguments return array");

  var arr = ["a","b","c","a"];

  var expected = ["a","a"];

  var result = last.omitAny(["b","c"], arr);
  t.looseEqual(result, expected, "removes items");
  t.looseEqual(arr, ["a","b","c","a"], "original objects not harmed");

  t.end();
});

test('partial', function (t) {

  var empty = last.partial();
  t.equal(typeof(empty), "function", "no arguments returns function");

  var expected = [1,2,3];

  var prt = function(a, b, c){

    t.equal(a, expected[0], "pass arguments");
    t.equal(b, expected[1], "pass arguments");
    t.equal(c, expected[2], "pass arguments");

    return a + b + c;
  };

  var fn = last.partial(prt, expected[0]);

  var result = fn(expected[1], expected[2]);

  t.equal(result, expected[0] + expected[1] + expected[2], "returns value");

  t.end();
});

test('pick', function (t) {

  var empty = last.pick();
  t.looseEqual(empty, [], "no arguments return array");

  var obj = {"a":16,"b":9,"c":"c","d":13};
  var expected = {"b":9,"d":13};

  var result = last.pick(["b","d"], obj);

  t.looseEqual(result, expected, "picks attributes");
  t.looseEqual(obj, {"a":16,"b":9,"c":"c","d":13}, "original objects not harmed");

  t.end();
});

test('reduce', function (t) {

  var empty = last.reduce();
  t.notOk(empty, "no arguments returns undefined");

  var arr = [7,9,11,13];

  var prd = function(acc, num){
    return acc + num;
  };

  var expected = 40;

  var result = last.reduce(prd,0,arr);

  t.looseEqual(result, expected, "reduces value");

  t.end();
});

test('values', function (t) {

  var empty = last.values();
  t.looseEqual(empty, [], "no arguments returns empty array");

  var obj = {"a":16,"b":9,"c":"c","d":13};
  var expected = [16,9,"c",13];

  var result = last.values(obj);

  t.looseEqual(result, expected, "returns values");

  t.end();
});

test('without', function (t) {

  var empty = last.without();
  t.looseEqual(empty, {}, "no arguments returns empty object");

  var obj = {"a":16,"b":9,"c":"c","d":13};
  var expected = {"a":16};

  var result = last.without(["b","c","d"], obj);

  t.looseEqual(result, expected, "removes multiple attributes");
  t.looseEqual(obj, {"a":16,"b":9,"c":"c","d":13}, "original objects not mutated");

  expected = {"b":9,"c":"c","d":13};

  result = last.without("a", obj);

  t.looseEqual(result, expected, "removes single attribute");
  t.looseEqual(obj, {"a":16,"b":9,"c":"c","d":13}, "original objects not mutated");

  t.end();
});

test('wrap', function (t) {

  var empty = last.wrap();
  t.equal(typeof(empty), "function", "no arguments returns function");

  var expected = {"a":16};

  var wrapped = last.wrap(expected);
  var result = wrapped();

  t.equal(result, expected, "returns same value");

  t.end();
});

test('wrapApply', function (t) {

  var empty = last.wrapApply();
  t.equal(typeof(empty), "function", "no arguments returns function");

  var expected = 20;

  var fn = function(num){ return num * 2; };

  var wrapped = last.wrapApply(fn, 10);

  var result = wrapped();

  t.equal(result, expected, "removes function value");

  t.end();
});