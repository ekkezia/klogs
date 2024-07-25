'use client'

import React from 'react';
import Image from 'next/image';
import { useMouseContext } from '@/contexts/ mouse-context';

const MouseSwitch: React.FC = () => {
  const { setShowMouse } = useMouseContext;

  // Use Tailwind classes for static styles and inline styles for dynamic ones
  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        filter: 'var(--primary-filter)', // Set a CSS variable or inline style
        transition: 'filter 0.3s',
      }}
      onClick={setShowMouse}
    >
      <style jsx>{`
        div:hover {
          filter: var(--primary-lighter-filter);
        }
      `}</style>
      <Image
        src={`/images/icons/mouse-switch/mouse-switch.svg`}
        width={20}
        height={20}
        alt="mouse switch"
      />
    </div>
  );
};

export default MouseSwitch;
