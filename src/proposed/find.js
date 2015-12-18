"use strict";

/**
 * find
 * @param fn
 * @param subject
 * @returns {*}
 */
module.exports = function find(fn, subject) {
  var idx = -1, len = subject.length;
  while (++idx < len) {
    if (fn(subject[idx])) {
      return subject[idx];
    }
  }
  return null;
}