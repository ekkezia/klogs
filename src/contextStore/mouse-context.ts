import { Theme } from '@mui/material';
import { createContext } from 'react';

type IFunction = (...args: any[]) => any;

interface IPLabThemeContextProps {
  userTheme: Theme;
  setUserTheme: IFunction;
}
export const PLabThemeContext = createContext<IPLabThemeContextProps | null>(
  null,
);

interface IMouseContextProps {
  showMouse: boolean;
  setShowMouse: IFunction;
}

export const MouseContext = createContext<IMouseContextProps | null>(null);

interface INavbarContextProps {
  isOpen: boolean;
  setisOpen: IFunction;
}

export const NavbarContext = createContext<INavbarContextProps | null>(null);
