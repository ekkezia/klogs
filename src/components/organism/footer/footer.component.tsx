import React from 'react';

const currentYear = new Date().getFullYear();

const FOOTER = Object.freeze([
  {
    text: `Copyright © ${currentYear} Elizabeth Kezia Widjaja. All rights reserved.`,
    url: null,
  },
]);

const Footer: React.FC = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-full relative px-4 text-primary">
      {FOOTER.map(({ text, url }) =>
        url ? (
          <a href={url} target="_blank" rel="noreferrer" key={text}>
            <p className="body3">{text}</p>
          </a>
        ) : (
          <p className="body3" key={text}>
            {text}
          </p>
        ),
      )}
    </div>
  );
};

export default Footer;
