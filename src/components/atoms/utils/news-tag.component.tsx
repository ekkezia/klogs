import React from 'react';

interface NewsTagProps {
  text: string;
  asHeader?: boolean;
}

const NewsTag: React.FC<NewsTagProps> = ({ text, asHeader }) => {
  const commonClasses = `
    flex items-center
    h-[40px] text-[12px] leading-[1.2] font-bold uppercase
    border-r border-gray-300
    mr-2
    transition-all
    duration-300
  `;

  const headerClasses = `
    ${commonClasses}
    bg-blue-500 text-white
    md:py-2 md:px-3
  `;

  const boxClasses = `
    ${commonClasses}
    bg-white text-blue-500
    md:py-2 md:px-3
  `;

  if (asHeader) {
    return <div className={headerClasses}>{text}</div>;
  }

  return <div className={boxClasses}>{text}</div>;
};

export default NewsTag;
