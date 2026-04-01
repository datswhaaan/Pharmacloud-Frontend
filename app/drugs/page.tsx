"use client"

import { useState, useEffect } from "react";
import DrugTable from "@/components/DrugTable";
import SearchBar from "@/components/SearchBar";
import HighAlertFilter from "@/components/filters/HighAlertFilter";

import { fetchDrugs } from "@/lib/api/drug";

export default function Drugs() {
  const [search, setSearch] = useState("");
  const [highAlert, setHighAlert] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 7;
  const skip = (currentPage - 1) * limit;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, highAlert]);

  useEffect(() => {
    handleSearch();
  }, [search, highAlert, currentPage]);

  const handleSearch = async () => {
    try {
      const data = await fetchDrugs({
        search,
        highAlert,
        skip,
        limit,
      });
      setDrugs(data.drugs);
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
      >
        <HighAlertFilter 
          highAlert={highAlert} 
          setHighAlert={setHighAlert} 
        />
      </SearchBar>

      <DrugTable 
        drugs={drugs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}