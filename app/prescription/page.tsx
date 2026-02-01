import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import { PrescriptionTable } from "@/components/PrescriptionTable";
import { Button } from "@/components/base/buttons/button";
import { Camera01 } from "@untitledui/icons";

export default function Prescription() {
  return (
    <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
      <SearchBar />
      <div className="flex items-end justify-between w-full">
        <Filters/>
        <Button 
          iconLeading={<Camera01 className="w-4 h-4 text-white" />}
          className="flex items-center justify-center"
          href="/detection"
        >
          <p className="text-white">ตรวจสอบรายการยา</p>
        </Button>
      </div>
      <PrescriptionTable type="prescription"/>
    </div>
  );
}

