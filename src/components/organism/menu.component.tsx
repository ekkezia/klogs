import React from 'react';
import { OUTER_BAR_WIDTH } from '@/styles/shared';
import Link from 'next/link';

const MENU = Object.freeze([
  {
    name: 'home',
    url: '/',
    symbol: '🏠',
  },
  {
    name: 'note',
    url: '/logs',
    symbol: '🗒️',
  },
]);

const Menu: React.FC = () => {
  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 flex flex-col items-center">
      {MENU.map(({ name, url, symbol }) => (
        <Link
        passHref
          href={url}
          key={name}
          className={`flex items-center justify-center relative border-b first:border-t border-primary hover:bg-secondary`}
          style={{
            width: OUTER_BAR_WIDTH,
            height: OUTER_BAR_WIDTH,
          }}
        >
          <div className="body1 text-primary">{symbol}</div>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
