/**
 *
 * @param fn
 * @param subject
 * @returns {*}
 */
export function map(fn, subject){

  "use strict"

  const len = subject && subject.length
  const hasMap = subject && subject.map

  if (!len && !hasMap) return fn(subject)
  if (!len) return subject.map(fn)

  let i = -1
  const result = new Array(len)
  const isString = typeof(subject) === "string"

  while (++i < len){
    result[i] = fn(subject[i], i)
  }

  return isString ? result.join("") : result
}
