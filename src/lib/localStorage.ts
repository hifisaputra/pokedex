export const writeToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const readFromStorage = (key: string) => {
  return localStorage.getItem(key)
}
