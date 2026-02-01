import { DrugTable } from "@/components/DrugTable";
import mockDrugs from "@/components/mockDrugs.json";
import SearchBar from "@/components/SearchBar";

export default function Drugs() {
  return (
    <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
      <SearchBar />
      <DrugTable drugs={mockDrugs.data}/>
    </div>
  );
}

