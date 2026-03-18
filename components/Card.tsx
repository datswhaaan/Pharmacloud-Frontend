type CardProps = {
    title?: string;
    className?: string;
    children?: React.ReactNode;
    scrollable?: boolean;
    width?: 'full' | 'fit';
    center?: boolean;
};

export default function Card({ 
  title, 
  className = "", 
  children, 
  scrollable = false,
  width = 'full',
  center = false
}: CardProps) {
  return (
    <div
      className={`
        ${width == 'full' ? 'w-full' : 'w-fit'} rounded-xl ring-1 ring-secondary bg-white shadow-sm
        flex ${center? ' ' : 'flex-col p-5'}
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
