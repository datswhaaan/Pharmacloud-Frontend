type CardProps = {
    title?: string;
    className?: string;
    children?: React.ReactNode;
    scrollable?: boolean;
};

export default function Card({ 
  title, 
  className = "", 
  children, 
  scrollable = false 
}: CardProps) {
  return (
    <div
      className={`
        w-full rounded-xl ring-1 ring-secondary bg-white shadow-sm
        flex flex-col p-5
        ${className}
      `}
    >
      
      {title && (
        <h2>
          {title}
        </h2>
      )}

      <div className={`flex-1 text-gray-600 min-h-0 ${scrollable ? "overflow-y-auto overflow-x-hidden" : ""}`}>
        {children ?? "No data"}
      </div>

    </div>
  );
}
