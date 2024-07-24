interface IArrow {
  color?: string;
}

export const Arrow: React.FC<IArrow> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 42 48"
    fill={color ?? 'none'}
  >
    <path d="M1.08203 47L40.9192 24L1.08203 1" stroke="#D9D9D9" />
  </svg>

  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="243"
  //   height="50"
  //   viewBox="0 0 243 50"
  //   fill={color ?? 'none'}
  // >
  //   <path d="M200 49L241.569 25L200 1" stroke="#D9D9D9" />
  // </svg>
);
