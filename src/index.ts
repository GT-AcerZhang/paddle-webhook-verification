/* eslint-disable @typescript-eslint/camelcase */
import { createVerify } from 'crypto'
import { serialize as phpSerialize } from 'php-serialize'

export function verify(publicKey: string, postBody: { [key: string]: any }): boolean {
  const { p_signature, ...postBodyRest } = postBody

  if (!p_signature || typeof p_signature !== 'string') {
    return false
  }

  const signature = Buffer.from(p_signature, 'base64')
  const serializedPostBody = serialize(sortByKey(postBodyRest))

  const verifier = createVerify('sha1')
  verifier.update(serializedPostBody)
  verifier.end()

  return verifier.verify(publicKey, signature)
}

function sortByKey(object: { [key: string]: any }) {
  const keys = Object.keys(object).sort()

  const sortedObject: { [key: string]: any } = {}
  for (const i in keys) {
    sortedObject[keys[i]] = object[keys[i]]
  }

  return sortedObject
}

function serialize(object: { [key: string]: any }): string {
  // 1) Encode arrays in their string form: `[1, 2, 3]` -> `'1, 2, 3'`
  // 2) Encode any non-strings as their JSON stringified version: `3` -> `'3'`
  for (const property in object) {
    if (object.hasOwnProperty(property) && typeof object[property] !== 'string') {
      if (Array.isArray(object[property])) {
        object[property] = object[property].join(', ')
      } else {
        object[property] = JSON.stringify(object[property])
      }
    }
  }

  // 3) Serialize in the way that PHP would
  return phpSerialize(object)
}
