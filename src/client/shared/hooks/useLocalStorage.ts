import { useEffect, useState } from "react";

const PREFIX = 'ez-life-'

export function useLocalStorage(key: string, initialValue) {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    try {
      const serializedValue = localStorage.getItem(prefixedKey)
      if (serializedValue) return JSON.parse(serializedValue)
      return initialValue instanceof Function ? initialValue() : initialValue
    } catch (err) {
      return undefined
    }
  })
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  },[prefixedKey, value])

  return [value, setValue]
}
