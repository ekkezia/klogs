import { IKeyString } from '../../types/shared';

export const checkEmailValidity = (email: string) => {
  const validEmail = email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  if (validEmail) return true;
  else return false;
};

export const dataIsNull = <T>(obj: Record<string, T>): boolean => {
  for (let key in obj) {
    if (
      obj.hasOwnProperty(key) ||
      obj[key] === '' ||
      obj[key] === undefined ||
      obj[key] === null
    ) {
      return true;
    }
  }
  return false;
};
