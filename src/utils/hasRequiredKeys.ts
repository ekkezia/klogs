export function hasRequiredKeys(obj: object, requiredKeys: string[]) {
  return requiredKeys.every((key) => obj.hasOwnProperty(key));
}
