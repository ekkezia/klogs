import Link from 'next/link';
import React, { ReactNode } from 'react';

interface BlockLinkProps {
  backgroundColor?: string;
  href: string;
  children: ReactNode;
  cssStyle?: string;
  target?: string;
  fitContent?: boolean;
  fitWidth?: boolean;
}

const BlockLink: React.FC<BlockLinkProps> = ({
  backgroundColor,
  href,
  children,
  cssStyle = '',
  target,
  fitContent,
  fitWidth,
}) => {
  const containerClasses = `
    block
    ${fitContent ? 'h-fit' : 'h-full'}
    ${fitWidth ? 'w-fit' : 'w-full'}
    cursor-pointer
    no-underline
    transition-colors
    duration-300
    ease-in-out
    ${backgroundColor ? `bg-[${backgroundColor}]` : 'hover:bg-blue-200'}
    ${cssStyle}
  `;

  return (
    <Link href={href} passHref>
      <a className={containerClasses} target={target ?? '_blank'} rel="noreferrer">
        {children}
      </a>
    </Link>
  );
};

export default BlockLink;
