"use strict";

module.exports = function indexesOf(target, subject){

  var i = -1, len = subject.length, result = [];

  if(!Array.isArray(target)){

    while (++i < len) {
      if (subject[i] === target) {
        result.push(i);
      }
    }
    return result;
  }

  var i2 = -1, len2 = target.length;

  while (++i < len) {
    i2 = -1;
    while (++i2 < len2) {
      if (subject[i] === target[i2]) {
        result.push(i);
      }
    }
  }

  return result;
}