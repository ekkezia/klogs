'use client'

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type variantOptions = 'primary' | 'secondary';

interface ICustomButtonProps {
  variant?: variantOptions;
  darkMode?: boolean;
  url?: string;
  newTab?: boolean;
  customColor?: string;
  fitContent?: boolean;
  limitHeight?: boolean;
  action?: () => void;
  disabled?: boolean;
  icon?: string;
  noBorder?: boolean;
  testId?: string;
  children: React.ReactElement | string;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  variant,
  darkMode,
  url,
  newTab,
  customColor,
  fitContent,
  limitHeight,
  action,
  disabled,
  children,
  icon,
  noBorder,
  testId,
}) => {

  const baseStyles = "flex items-center justify-center text-white font-bold uppercase text-sm";
  const dynamicStyles = {
    width: fitContent ? 'auto' : '100%',
    maxHeight: limitHeight ? '48px' : 'none',
    borderColor: noBorder ? 'transparent' : customColor || 'gray',
    backgroundColor: disabled
      ? (customColor || 'blue') + '80' // Adjust opacity for disabled state
      : customColor || (variant === 'primary' ? 'blue' : 'transparent'),
    color: disabled
      ? 'white'
      : (variant === 'primary' ? 'white' : darkMode ? 'white' : 'black'),
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const hoverStyles = !disabled
    ? `hover:bg-${variant === 'primary' ? 'gray-300' : 'black'} hover:text-${variant === 'primary' ? 'black' : 'white'}`
    : '';

  const commonButtonClasses = `${baseStyles} ${hoverStyles} border ${noBorder ? 'border-0' : 'border-solid'} ${icon ? 'space-x-2' : ''}`;
  
  const content = (
    <>
      {children}
      {icon && (
        <Image
          src={`/images/icons/button/${icon}`}
          width={16}
          height={16}
          alt="Button icon"
          className="icon"
        />
      )}
    </>
  );

  if (disabled) {
    return (
      <button
        type="button"
        style={dynamicStyles}
        className={`${commonButtonClasses} opacity-50`}
        disabled
        data-testid={testId}
      >
        {content}
      </button>
    );
  }

  if (!url) {
    return (
      <button
        type="button"
        style={dynamicStyles}
        onClick={action}
        className={commonButtonClasses}
        data-testid={testId}
      >
        {content}
      </button>
    );
  }

  if (!newTab) {
    return (
      <Link href={url} passHref>
        <button
          type="button"
          style={dynamicStyles}
          className={commonButtonClasses}
          data-testid={testId}
        >
          {content}
        </button>
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={dynamicStyles}
      className={commonButtonClasses}
      data-testid={testId}
    >
      {content}
    </a>
  );
};

export default CustomButton;
