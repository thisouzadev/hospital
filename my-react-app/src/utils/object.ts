/* eslint-disable import/prefer-default-export */
export const objectFieldsToString = (
  obj: Record<string, string | number>,
): Record<string, string> => {
  const newObj = { ...obj };
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    newObj[key] = String(newObj[key]);
  });

  keys.forEach((key) => {
    if (newObj[key] === '' || newObj[key] === undefined) {
      delete newObj[key];
    }
  });

  return newObj as Record<string, string>;
};
