/**
 *
 * @param fn
 * @param subject
 * @returns {{}}
 */
export function mapObj(fn, subject){

  "use strict"

  const ks = subject && Object.keys(subject)
  const len = ks && ks.length
  const result = {}
  let k
  let i = -1
  while (++i < len){
    k = ks[i]
    result[k] = fn(subject[k], k)
  }
  return result
}
