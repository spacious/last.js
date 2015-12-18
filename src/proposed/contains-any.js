"use strict";



function containsAny(target, subject){

  var idx = -1, len = target.length;
  while (++idx < len) {
    if(~indexOf(target[idx], subject)){
      return true;
    }
  }
  return false;
}