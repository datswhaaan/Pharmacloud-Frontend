export default function Card(
    { title, className = "", children } : 
    { title?: string; className?: string; children?: React.ReactNode }
) {
  return (
    <div
      className={`
        w-full rounded-xl border border-primary-gray bg-white shadow-sm
        flex flex-col p-5
        ${className}
      `}
    >
      
      {title && (
        <h2 className="text-2xl font-semibold mb-3">
          {title}
        </h2>
      )}

      <div className="flex-1 text-sm text-gray-600 min-h-0">
        {children ?? "No data"}
      </div>

    </div>
  );
}
