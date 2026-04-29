"use client"

import BaseTable, { Column } from "@/components/BaseTable";
import Badges from "./Badges";

interface Props<T extends Record<string, any>> {
  data: T[];
  type: "prescription" | "detection" | "statistics";
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalPages?: number;
  rowNumber?: number;
  getRowId: (item: T) => string;
  getRowHref: (item: T) => string;
}

export default function PrescriptionTable<T extends Record<string, any>>({
  data,
  type,
  currentPage,
  setCurrentPage,
  totalPages,
  rowNumber,
  getRowId,
  getRowHref,
}: Props<T>) {

  const columns: Column<T>[] = [

    { key: "HN", label: "HN", isRowHeader: true, render: (item) => item.visit_hn },
    { key: "VN", label: "VN", render: (item) => item.visit_vn },
    {
      key: "name",
      label: "ชื่อ-สกุล ผู้ป่วย",
      render: (item) => item.patient_name,
    },

    ...(type !== "statistics"
      ? [
          {
            key: "time",
            label: "เวลารับบริการ",
            render: (item) => item.visit_begin_visit_time,
          } as Column<T>, 
          {
            key: "status",
            label: "สถานะ",
            render: (item) => (
              <Badges varient="status" status={item.status} />
            ),
          } as Column<T>,
        ]
    : []),

    ...(type == "statistics"
      ? [
          {
            key: "time",
            label: "เวลาตรวจสอบ",
            render: (item) => item.verified_at || "-",
          } as Column<T>, 
          {
            key: "reviewedby",
            label: "ผู้รับผิดชอบ",
            render: (item) => item.verified_by || "-"
          } as Column<T>,
        ]
    : []),
  ];
  return (
    <BaseTable
      items={data}
      columns={columns}
      getRowId={getRowId}
      getRowHref={getRowHref}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      rowNumber={rowNumber}
    />
  );
};
