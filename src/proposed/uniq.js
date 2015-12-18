"use strict";

function uniq(subject){
  var idx = -1, len = subject.length, item, result = [];
  while (++idx < len) {
    item = subject[idx];
    if(!contains(item, result)){
      result.push(item);
    }
  }
  return result;
}