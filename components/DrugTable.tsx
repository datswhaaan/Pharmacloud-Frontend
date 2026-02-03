"use client"

import BaseTable, { Column } from "@/components/BaseTable";
import Badges from "./Badges";

type Drug = {
  id: number;
  code: string;
  name: string;
  riskLevel: string | null;
};

export default function DrugTable({ drugs }: { drugs: Drug[] }){

    const normalizedDrugs: Drug[] = drugs.map(d => ({
        ...d,
        riskLevel: d.riskLevel ?? "unknown",
    }));

    const columns: Column<Drug>[] = [
        {
            key: "code",
            label: "รหัส",
            isRowHeader: true,
            render: (d) => d.code,
        },
        {
            key: "name",
            label: "ชื่อทั่วไป",
            render: (d) => d.name,
        },
        {
            key: "risk",
            label: "",
            render: (d) => (
                <div className="flex justify-end">
                <Badges varient="riskLevel" level={d.riskLevel || undefined} />
                </div>
            ),
        },
    ];

    return (
        <BaseTable
            items={normalizedDrugs}
            columns={columns}
            getRowId={(d: Drug) => d.id}
            getRowHref={(d: Drug) => `/drugs/${d.id}`}
        />
    );
};
