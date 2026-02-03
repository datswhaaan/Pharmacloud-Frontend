"use client"

import BaseTable, { Column } from "@/components/BaseTable";
import Badges from "./Badges";

type Item = {
    id: number,
    severity: string,
    HN: number,
    VN: number,
    name: string,
    date: string,
    status: string,
    reviewedBy?: string
};

interface Paginated<T> {
  items: T[];
  total: number;
}
interface Props {
    prescription: Paginated<Item>,
    type: "prescription" | "detection" | "statistics"
}

export default function PrescriptionTable({ prescription, type }: Props ){
  const columns: Column<Item>[] = [

    ...(type !== "statistics"
      ? [
          {
            key: "severity",
            label: "ระดับความรุนแรง",
            isRowHeader: true,
            render: (item) => (
              <Badges varient="severity" level={item.severity} />
            ),
          } as Column<Item>,
        ]
    : []),

    { key: "HN", label: "HN", isRowHeader: true, render: (item) => item.HN },
    { key: "VN", label: "VN", render: (item) => item.VN },
    {
      key: "name",
      label: "ชื่อ-สกุล ผู้ป่วย",
      render: (item) => item.name,
    },
    {
      key: "time",
      label: "เวลารับบริการ",
      render: (item) => item.date,
    },

    ...(type !== "statistics"
      ? [
          {
            key: "status",
            label: "สถานะ",
            render: (item) => (
              <Badges varient="status" status={item.status} />
            ),
          } as Column<Item>,
        ]
    : []),

    ...(type == "statistics"
      ? [
          {
            key: "reviewedby",
            label: "ผู้รับผิดชอบ",
            render: (item) => item.reviewedBy
          } as Column<Item>,
        ]
    : []),
  ];

  return (
    <BaseTable
      items={prescription.items}
      columns={columns}
      getRowId={(i) => i.id}
      getRowHref={(i) => `/${type}/${i.id}`}
    />
  );
};
