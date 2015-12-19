"use strict";

var test = require('tape');
var lest = require('../lib/lest');

const increment = (val) => {
  const type = typeof(val);
  if(type === "number"){
    return val + 1
  }
  if(type === "string"){
    return String.fromCharCode(val.charCodeAt(0) + 1) + val.substr(1)
  }
  return val
}

const decrement = (val) => {
  const type = typeof(val);
  if(type === "number"){
    return val - 1
  }
  if(type === "string"){
    return String.fromCharCode(val.charCodeAt(0) - 1) + val.substr(1)
  }
  if(Array.isArray(val) && val.length){
    return val.slice(1)
  }
  return val
}


test('flatMap', function (t) {

  let letters = "abc"
  
  let result = lest.flatMap(increment, letters)
  
  t.equals(result, "bcd", "maps over string")

  letters = ["Qw","We","Er","Rt","Ty"]

  result = lest.flatMap(increment, letters)

  t.looseEquals(result, [ 'Rx', 'Xf', 'Fs', 'Su', 'Uz' ], "maps recursively over array of strings")

  letters = [["abc","123"],[["def","456"],["ghi","78"]],[["xy"]]]

  result = lest.flatMap(increment, letters)

  t.looseEquals(result, [ 'bcd', '234', 'efg', '567', 'hij', '89','yz' ], "maps over multi-dimensional array of strings")

  let mix = [1, ["1"], "2", [[[4]]]]

  result = lest.flatMap(increment, mix)

  t.looseEquals(result, [2, "2", "3", 5 ])

  const number = 100

  result = lest.flatMap(increment, number)

  t.equals(result, 101, "maps over number")
  
  let numbers = [1, 3, 5, 7]

  result = lest.flatMap(increment, numbers)

  t.looseEquals(result, [2, 4, 6, 8])

  numbers = [[1, 3, 5, 7],[1, 3, 5, 7]]

  result = lest.flatMap(increment, numbers)

  t.looseEquals(result, [2, 4, 6, 8, 2, 4, 6, 8])

  numbers = [[[[[12, 34]]]],[[[[56, 78]]]]]

  result = lest.flatMap(increment, numbers)

  t.looseEquals(result, [13, 35, 57, 79])

  t.end()
})

test('map', function (t) {

  let letters = "xyz"

  let result = lest.map(decrement, letters)

  t.equals(result, "wxy", "maps over string")

  const number = 100

  result = lest.map(decrement, number)

  t.equals(result, 99, "maps over number")

  letters = ["Qw","We","Er","Rt","Ty"]

  result = lest.map(decrement, letters)

  t.looseEquals(result, [ 'Pw', 'Ve', 'Dr', 'Qt', 'Sy' ], "maps over array of strings with no recursion")

  let numbers = [1, 3, 5, 7]

  result = lest.map(decrement, numbers)

  t.looseEquals(result, [0, 2, 4, 6])

  numbers = [[1, 3, 5, 7],[1, 3, 5, 7]]

  result = lest.map(decrement, numbers)

  t.looseEquals(result,[[3, 5, 7],[3, 5, 7]], "maps over multi-dimensional arrays with no recursion")

  t.end()
})

test('mapObj', function (t) {

  let letters = { "g": 0, "pg": 12, "r":17, "xxx": 18 }

  let result = lest.mapObj(increment, letters)

  t.looseEquals(result,  { "g": 1, "pg": 13, "r":18, "xxx": 19 })

  t.end()
})