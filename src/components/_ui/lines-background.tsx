const arrayLength = 150

const LinesBackground: React.FC<{ height: number }> = ({ height }) => {
  return (
    <div className="absolute w-full">
      {Array.from({ length: arrayLength }).map((_, index) => (
        <div
          key={index} // Provide a unique key for each element
          className="w-full border-b border-primary px-4"
          style={{ height: height }}
        />
      ))}
    </div>
  )
}

export default LinesBackground
