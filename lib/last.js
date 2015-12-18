/* last */
var Apr = Array.prototype;
var slice    = Apr.slice;
var isArray = Array.isArray;
var keys = Object.keys;

/**
 * wraps fn.apply
 *
 * bind this function or passed if context matters
 *
 * @param fn
 * @param args - array applied as arguments
 * @returns {*}
 */
function apply(fn, args){

  return fn.apply(this, args);
}

/**
 *
 * @returns {Function}
 */
function compose() {

  var args = slice.call(arguments);
  var start = args.length - 1;

  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) {
      result = args[i].call(this, result);
    }return result;
  };
}

/**
 *
 * @returns {Array}
 */
function concat() {

  var len = arguments.length, arr = [], i = -1, item, childLen, j;

  while (++i < len) {

    item = arguments[i];

    if (isArray(item)) {

      j = -1;
      childLen = item.length;

      while (++j < childLen) {

        arr.push(item[j]);
      }
    } else {
      arr.push(item);
    }
  }
  return arr;
}

/**
 *
 * @param target
 * @param subject
 * @returns {boolean}
 */
function contains(target, subject) {

  var idx = -1, len = subject && subject.length;

  while (++idx < len) {
    if (subject[idx] === target) {
      return true;
    }
  }

  return false;
}

/**
 *
 * @param input
 * @returns {Array}
 */
function cloneArray(input) {

  var len = input && input.length,
    cloned = new Array(len),
    idx = -1;

  while(++idx < len){

    cloned[idx] = input[idx];
  }

  return cloned;
}

/**
 *
 * @param input
 * @returns {{}}
 */
function cloneObject(input) {

  var ks = keys(input),
    total = ks.length,
    cloned = {},
    i, key;

  for (i = 0; i < total; i++) {
    key = ks[i];
    cloned[key] = input[key];
  }

  return cloned;
}

/**
 *
 * @param input
 * @returns {*}
 */
function clone(input) {

  if(typeof input === "object"){

    if(Array.isArray(input)){

      return cloneArray(input);
    }

    return cloneObject(input);
  }

  return input;
}

/**
 *
 * @param subject
 * @returns {boolean}
 */
function empty(subject){

  if(!subject){
    return true;
  }

  if(Array.isArray(subject) || typeof subject === "string"){

    return empty(subject.length);
  }

  if(typeof subject === "object"){

    return empty(keys(subject));
  }

  if(typeof subject === "number"){

    return subject === 0;
  }

  return false;
}

/**
 *
 * @param subject
 * @returns {*}
 */
function identity(subject){
  return subject;
}

/**
 *
 * @param first
 * @param second
 * @returns {Array}
 */
function difference(first, second){

  var out = [];
  var idx = 0;
  var firstLen = first && first.length;

  while (idx < firstLen) {

    if (!~indexOf(first[idx], second) && !~indexOf(first[idx], out)) {

      out[out.length] = first[idx];
    }

    idx += 1;
  }
  return out;
}

/**
 * filter
 * @param fn
 * @param subject
 * @returns {Array}
 */
function filter(fn, subject) {
  var i = -1, len = subject && subject.length, result = [];
  while (++i < len) {
    if (fn(subject[i])) {
      result.push(subject[i]);
    }
  }
  return result;
}

/**
 *
 * @param target
 * @param subject
 * @returns {number}
 */
function indexOf(target, subject) {
  var idx = -1, len = subject && subject.length;
  while (++idx < len) {
    if (subject[idx] === target) {
      return idx;
    }
  }
  return -1;
}

/**
 *
 * @param target
 * @param subject
 * @returns {Array}
 */
function intersection(target, subject){
  var idx = -1, len = target && target.length, item, result = [];
  while (++idx < len) {
    item = target[idx];
    if(~indexOf(item, subject)){
      result.push(item);
    }
  }
  return result;
}

/**
 *
 * @param fn
 * @param subject
 * @returns {Array}
 */
function map(fn, subject) {
  var i = -1, len = subject && subject.length || 0, result = new Array(len);
  while (++i < len) {
    result[i] = fn(subject[i], i);
  }
  return result;
}

/**
 *
 * @param a
 * @param b
 * @returns {{}}
 */
function merge(a, b) {

  var result = {};
  var ks = a && keys(a);
  var len = ks && ks.length;
  var i = -1;
  while (++i < len) {
    result[ks[i]] = a[ks[i]];
  }

  ks = b && keys(b);
  len = ks && ks.length;
  i = -1;
  while (++i < len) {
    result[ks[i]] = b[ks[i]];
  }
  return result;
}

/**
 *
 * @param subject
 * @returns {{}}
 */
function mergeAll(subject) {

  var len = subject && subject.length;
  var i = -1;
  var result = {};

  var ks;
  var ki;
  var kl;
  var a;

  while (++i < len) {
    a = subject[i];
    ks = keys(a);
    kl = ks.length;
    ki = -1;
    while (++ki < kl) {
      result[ks[ki]] = a[ks[ki]];
    }
  }
  return result;
}

/**
 *
 * @param val
 * @param subject
 * @returns {Array}
 */
function omit(val, subject) {
  var result = [];
  var len = subject && subject.length;
  var i = -1;
  var v;
  while (++i < len) {
    v = subject[i];
    if(v !== val){
      result.push(v);
    }
  }
  return result;
}

/**
 *
 * @param vals
 * @param subject
 * @returns {Array}
 */
function omitAny(vals, subject) {

  var result = clone(subject) || [];
  var idx = -1, len = vals && vals.length;
  while (++idx < len) {
    result = omit(vals[idx], result);
  }
  return result;
}

/**
 *
 * @param fn
 * @returns {Function}
 */
function partial (fn) {

  var boundLength = arguments.length ? arguments.length - 1 : 0, boundArgs;
  boundArgs = new Array(boundLength);
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = arguments[i + 1];
  }
  return function () {
    var length = arguments.length,
      args = new Array(boundLength + length),
      i;
    for (i = 0; i < boundLength; i++) {
      args[i] = boundArgs[i];
    }
    for (i = 0; i < length; i++) {
      args[boundLength + i] = arguments[i];
    }
    return fn.apply(this, args);
  };
}

/**
 *
 * @param ks
 * @param subject
 * @returns {{}}
 */
function pick(ks, subject){

  var result = {};
  var len = ks && ks.length;
  var i = -1;
  var k;
  while (++i < len) {
    k = ks[i];
    result[k] = subject[k];
  }
  return result;
}

/**
 *
 * @param fn
 * @param init
 * @param subject
 * @returns {*}
 */
function reduce(fn, init, subject) {

  var len = subject && subject.length;
  var result = init;
  var i = -1;
  while (++i < len) {
    result = fn(result, subject[i], i);
  }
  return result;
}

/**
 *
 * @param obj
 * @returns {Array}
 */
function values(obj){

  var result = [];
  var ks = obj && keys(obj);
  var len = ks && ks.length;
  var i = -1;
  while (++i < len) {
    result.push(obj[ks[i]]);
  }
  return result;
}

/**
 *
 * @param key
 * @param subject
 * @returns {{}}
 */
function without(key, subject) {

  var result = {};
  var ks = subject && keys(subject);
  var len = ks && ks.length;
  var i = -1;
  var k;

  if(Array.isArray(key)){
    while (++i < len) {
      k = ks[i];
      if(!contains(k, key)){
        result[k] = subject[k];
      }
    }
  }else{
    while (++i < len) {
      k = ks[i];
      if(k !== key){
        result[k] = subject[k];
      }
    }
  }

  return result;
}

/**
 *
 * @param subject
 * @returns {Function}
 */
function wrap(subject){

  return function(){

    return subject;
  }
}

/**
 *
 * @param fn
 * @returns {Function}
 */
function wrapApply(fn){

  var args = slice.call(arguments, 1);

  return function(){

    return fn.apply(null, args);
  }
}

module.exports = {
  apply: apply,
  compose: compose,
  concat: concat,
  contains: contains,
  clone: clone,
  difference: difference,
  empty: empty,
  filter: filter,
  identity: identity,
  indexOf: indexOf,
  intersection: intersection,
  map: map,
  merge: merge,
  mergeAll: mergeAll,
  omit: omit,
  omitAny: omitAny,
  partial: partial,
  pick: pick,
  reduce: reduce,
  values: values,
  without: without,
  wrap: wrap,
  wrapApply: wrapApply
};