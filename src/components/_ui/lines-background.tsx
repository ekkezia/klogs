const LinesBackground = () => {
  const arrayLength = 10; // Number of lines to render

  return (
    <div className="w-full absolute">
      {Array.from({ length: arrayLength }).map((_, index) => (
        <div
          key={index} // Provide a unique key for each element
          className="w-full border-b border-primary px-4"
          style={{ height: 36 }}
        />
      ))}
    </div>
  );
};

export default LinesBackground;
