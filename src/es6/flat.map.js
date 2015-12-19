/**
 *
 * @param fn
 * @param subject
 * @returns {*}
 */
export function flatMap(fn, subject){

  "use strict"

  const len = subject && subject.length
  const hasMap = subject && subject.map

  if (!len && !hasMap) return fn(subject)
  if (!len) return subject.map(fn)

  let i = -1
  let item
  let result = []
  const isString = typeof(subject) === "string"

  while (++i < len){
    item = subject[i]
    if (!isString && item.length){
      result = result.concat(flatMap(fn, item))
    } else {
      result[i] = fn(item, i)
    }
  }

  return isString ? result.join("") : result
}
