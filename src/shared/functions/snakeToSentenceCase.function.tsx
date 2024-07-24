export function snakeToSentenceCase(snakeCase: string) {
  return snakeCase.replace(/_/g, ' ');
}

export function toSnakeCase(str: string) {
  return str.replace(/\s+/g, '_').toLowerCase();
}
