interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    children?: React.ReactNode;
}
export default function SearchBar({
    search,
    setSearch,
    children
} : SearchBarProps) {
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-md ring-1 ring-secondary shadow-sm px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
                    <circle cx="11" cy="11" r="7" />
                </svg>
            </div>
            
            {children}
        </div>
    )
}