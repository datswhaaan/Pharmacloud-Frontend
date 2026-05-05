"use client"

import BaseTable, { Column } from "@/components/BaseTable";
import Badges from "./Badges";
import { Drug } from "@/types/drug";

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

    const columns: Column<Drug>[] = [
        {
            key: "code",
            label: "รหัส",
            isRowHeader: true,
            className: "w-32",
            render: (d) => d.drug_code,
        },
        {
            key: "name",
            label: "ชื่อสามัญ",
            render: (d) => d.drug_common_name,
        },
        {
            key: "risk",
            label: "",
            render: (d) => (
                <div className="flex justify-end">
                <Badges varient="riskLevel" level={d.flags?.is_high_alert ? "high" : ""} />
                </div>
            ),
        },
    ];

    return (
        <BaseTable
            items={drugs}
            columns={columns}
            getRowId={(d: Drug) => d.drug_id}
            getRowHref={(d: Drug) => `/drugs/${d.drug_id}`}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            rowNumber={7}
            getRowClassName={(d: Drug) => !d.flags.has_images ? "bg-gray-100" : ""}
        />
    );
};
