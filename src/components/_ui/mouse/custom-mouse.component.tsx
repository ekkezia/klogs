import React, { useEffect, useState } from 'react';
import { Z_INDEX_MODAL } from '../Layout';

interface ICustomMouseProps {
  color?: string;
}

interface IMouseEvent {
  clientX: number;
  clientY: number;
}

const CustomMouse: React.FC<ICustomMouseProps> = ({ color }) => {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  // Interactive Mouse
  useEffect(() => {
    const handleWindowMouseMove = (event: IMouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-[Z_INDEX_MODAL] pointer-events-none"
      style={{ background: 'transparent' }}
    >
      {/* Vertical line */}
      <div
        className="fixed bg-current transition-all duration-100 pointer-events-none"
        style={{
          width: '0.5px',
          height: '100vh',
          left: mouse.x,
          backgroundColor: color || 'rgba(0, 0, 0, 0.5)',
        }}
      />
      {/* Horizontal line */}
      <div
        className="fixed bg-current transition-all duration-100 pointer-events-none"
        style={{
          width: '100vw',
          height: '0.5px',
          top: mouse.y,
          backgroundColor: color || 'rgba(0, 0, 0, 0.5)',
        }}
      />
    </div>
  );
};

export default CustomMouse;
