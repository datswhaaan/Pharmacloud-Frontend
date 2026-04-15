"use client"

import BaseTable, { Column } from "@/components/BaseTable";
import Badges from "./Badges";
import { PrescriptionType } from "@/types/prescription"

interface Paginated<T> {
  items: T[];
  total: number;
}
interface Props {
    prescription: PrescriptionType[];
    type: "prescription" | "detection" | "statistics";
    currentPage?: number;
    setCurrentPage?: (page: number) => void;
    totalPages?: number;
    rowNumber?: number;
}

export default function PrescriptionTable({ 
  prescription, 
  type,
  currentPage,
  setCurrentPage,
  totalPages,
  rowNumber,
} : Props ){
  const columns: Column<PrescriptionType>[] = [

    // ...(type !== "statistics"
    //   ? [
    //       {
    //         key: "severity",
    //         label: "ระดับความรุนแรง",
    //         isRowHeader: true,
    //         render: (item) => (
    //           <Badges varient="severity" level={item.severity} />
    //         ),
    //       } as Column<Prescription>,
    //     ]
    // : []),

    { key: "HN", label: "HN", isRowHeader: true, render: (item) => item.visit_hn },
    { key: "VN", label: "VN", render: (item) => item.visit_vn },
    {
      key: "name",
      label: "ชื่อ-สกุล ผู้ป่วย",
      render: (item) => item.patient_name,
    },
    {
      key: "time",
      label: "เวลารับบริการ",
      render: (item) => item.visit_begin_visit_time,
    },

    ...(type !== "statistics"
      ? [
          {
            key: "status",
            label: "สถานะ",
            render: (item) => (
              <Badges varient="status" status={item.status} />
            ),
          } as Column<PrescriptionType>,
        ]
    : []),

    // ...(type == "statistics"
    //   ? [
    //       {
    //         key: "reviewedby",
    //         label: "ผู้รับผิดชอบ",
    //         render: (item) => item.verified_by
    //       } as Column<PrescriptionType>,
    //     ]
    // : []),
  ];

  return (
    <BaseTable
        items={prescription}
        columns={columns}
        getRowId={(i) => i.order_id}
        getRowHref={(i) =>
            type === "statistics"
            ? `/prescription/${i.order_id}`
            : `/${type}/${i.order_id}`
        }
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        rowNumber={rowNumber}
    />
  );
};
