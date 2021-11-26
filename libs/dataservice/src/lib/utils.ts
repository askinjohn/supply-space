import { customAlphabet, urlAlphabet } from 'nanoid';

export function objectValuesAsArray(
  object: any,
  keyName: string = '$key'
): any[] {
  const arr: any = [];
  if (object) {
    Object.keys(object).forEach((v) => {
      const obj = object[v];
      if (obj instanceof Object) {
        obj[keyName] = v;
      }
      arr.push(obj);
    });
  }
  return arr;
}

export const generateNanoid =  () => {
  const id = customAlphabet(urlAlphabet, 20)();
  return id
};
