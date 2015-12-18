"use strict";


module.exports = function slice(){
  var arp = Array.prototype;
  var len = arguments.length;
  if(!len){ return slice; }
  if(len === 1){
    return arp.slice.call(arguments[0]);
  }else if(len === 2){
    return arp.slice.call(arguments[0], arguments[1]);
  }else{
    return arp.slice.call(arguments[0], arguments[1], arguments[2]);
  }
}