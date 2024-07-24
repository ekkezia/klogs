import { RefObject } from 'react';

export interface IKeyString {
  [key: string]: string;
}

export interface IKeyRefs {
  // key must be the same as id (ex: 'apps-ecosystem')
  [key: string]: {
    id: string; // id used for section div id
    label: string; // label used for the text label (ex: 'Ecosystem Effect')
    ref: RefObject<HTMLDivElement>;
    idx: number;
  };
}

export type IFunction = (...args: any[]) => any;
