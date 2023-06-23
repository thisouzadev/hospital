export const objectFieldsToString = (obj: Record<string, string|number>): Record<string, string> => {
  const newObj = {...obj}
  const keys = Object.keys(obj);
  keys.forEach(key => {
    newObj[key] = String(newObj[key])
  })

  return newObj
}