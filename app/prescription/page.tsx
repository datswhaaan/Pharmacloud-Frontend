"use client"

import { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import PrescriptionTable from "@/components/PrescriptionTable";
import { Button } from "@/components/base/buttons/button";
import { Camera01 } from "@untitledui/icons";

import { PrescriptionType } from "@/types/prescription";

import { fetchPrescriptions } from "@/lib/api/prescription";

export default function Prescription() {
  const [search, setSearch] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [order, setOrder] = useState("desc");
  const [status, setStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prescriptions, setPrescriptions] = useState([]);
  
  const limit = 6;
  const skip = (currentPage - 1) * limit;

  useEffect(() => {
      handleSearch();
    }, [search, currentPage, status]);
  
    const handleSearch = async () => {
      try {
        const data = await fetchPrescriptions({
          search,
          startTime,
          endTime,
          skip,
          limit,
          order,
          status
        });
        setPrescriptions(data.prescriptions);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
      <SearchBar 
        search={search}
        setSearch={setSearch}
      />
      <div className="flex items-end justify-between w-full">
        <Filters
         status={status}
         setStatus={setStatus}
        />
        <Button 
          iconLeading={<Camera01 className="w-4 h-4 text-white" />}
          className="flex items-center justify-center"
          href="/detection"
        >
          <p className="text-white">ตรวจสอบรายการยา</p>
        </Button>
      </div>
      <PrescriptionTable 
        prescription={prescriptions} 
        type="prescription"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

