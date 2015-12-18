
/**
 * Apply an array of functions to a value (right to left)
 * @param fns
 * @param value
 */
module.exports = function ap(fns, value){
  var fn;
  var result = value;
  var i = fns.length;
  while (--i > -1) {
    fn = fns[i];
    result = fn(result);
  }
  return result;
};
