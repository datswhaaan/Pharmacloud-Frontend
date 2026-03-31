"use client"

import BaseTable, { Column } from "@/components/BaseTable";
import Badges from "./Badges";

type Drug = {
  drug_id: number;
  drug_code: string;
  drug_common_name: string;
  high_alert: string | null;
};

interface DrugTableProps {
    drugs: Drug[];
    currentPage?: number;
    setCurrentPage?: (page: number) => void;
    totalPages?: number;
}

export default function DrugTable({ 
    drugs,
    currentPage,
    setCurrentPage,
    totalPages,
}: DrugTableProps){
    const normalizedDrugs: Drug[] = drugs.map(d => ({
        ...d,
        high_alert: d.high_alert ?? "unknown",
    }));

    const columns: Column<Drug>[] = [
        {
            key: "code",
            label: "รหัส",
            isRowHeader: true,
            render: (d) => d.drug_code,
        },
        {
            key: "name",
            label: "ชื่อทั่วไป",
            render: (d) => d.drug_common_name,
        },
        {
            key: "risk",
            label: "",
            render: (d) => (
                <div className="flex justify-end">
                <Badges varient="riskLevel" level={d.high_alert || undefined} />
                </div>
            ),
        },
    ];

    return (
        <BaseTable
            items={normalizedDrugs}
            columns={columns}
            getRowId={(d: Drug) => d.drug_id}
            getRowHref={(d: Drug) => `/drugs/${d.drug_id}`}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
        />
    );
};
