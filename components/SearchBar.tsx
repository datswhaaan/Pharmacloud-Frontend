import { FilterLines } from "@untitledui/icons"

export default function SearchBar() {
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-md ring-1 ring-secondary shadow-sm px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md ring-1 ring-secondary shadow-sm
                        bg-white px-3 py-2 text-sm font-medium
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <FilterLines className="h-4 w-4 text-gray-500" />
                <p className="text-gray-500">กรอง</p>
            </button>
        </div>
    )
}