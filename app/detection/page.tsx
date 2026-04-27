"use client";

import { useState, useRef, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import PrescriptionTable from "@/components/PrescriptionTable";
import { fetchPrescriptions } from "@/lib/api/prescription";
import { useNotification } from "@/providers/notification-provider";
import PrescriptionFilter from "@/components/filters/PrescriptionFilter";
import { createWebSocket } from "@/lib/api/websocket";

export default function DetectionPage() {
  const [search, setSearch] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prescriptions, setPrescriptions] = useState([]);
  
  const limit = 7;
  const skip = (currentPage - 1) * limit;
  const status = "waiting"

  const stateRef = useRef({ currentPage, search, status, startTime, endTime, order });

  const { showNotification, removeAllNotifications } = useNotification();

  useEffect(() => {
    handleSearch();
  }, [currentPage, search, status, startTime, endTime, order]);

  useEffect(() => {
    stateRef.current = { currentPage, search, status, startTime, endTime, order };
  }, [currentPage, search, status, startTime, endTime, order]);

  useEffect(() => {
    if (currentPage === 1) {
      removeAllNotifications();
    }
  }, [currentPage, status]);

  useEffect(() => {
    const ws = createWebSocket({
      onMessage: async (data) => {
        const { currentPage, status } = stateRef.current;

        if (data.event === "NEW_PRESCRIPTION") {
          if (currentPage === 1 && status === "all") {
            await handleSearch();
          } else {
            showNotification("มีใบสั่งยาใหม่", "info");
          }
        }
      },
    });

    return () => ws.close();
  }, []);
  
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
      >
          <PrescriptionFilter
            startTime={startTime}
            endTime={endTime}
            order={order}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setOrder={setOrder}
          />
      </SearchBar>
      <PrescriptionTable 
        prescription={prescriptions} 
        type="detection"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        rowNumber={limit}
      />
    </div>
)}