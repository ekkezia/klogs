import { twMerge } from "tailwind-merge"

const arrayLength = 150

const LinesBackground: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="absolute w-full">
      {Array.from({ length: arrayLength }).map((_, index) => (
        <div
          key={index} // Provide a unique key for each element
          className={twMerge("w-full border-b border-primary px-4", className)}
        />
      ))}
    </div>
  )
}

export default LinesBackground
