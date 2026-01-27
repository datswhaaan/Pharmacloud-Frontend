"use client";
import { useMemo, useState } from "react";
import { DotsVertical } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import Badges from "./Badges";

export const DrugTable = ({ drugs }: { drugs: any[] }) => {
    // const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    //     column: "status",
    //     direction: "ascending",
    // });

    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const sortedItems = useMemo(() => {
    //     return teamMembers.items.sort((a, b) => {
    //         const first = a[sortDescriptor.column as keyof typeof a];
    //         const second = b[sortDescriptor.column as keyof typeof b];

    //         // Compare numbers or booleans
    //         if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
    //             return sortDescriptor.direction === "descending" ? second - first : first - second;
    //         }

    //         // Compare strings
    //         if (typeof first === "string" && typeof second === "string") {
    //             let cmp = first.localeCompare(second);
    //             if (sortDescriptor.direction === "descending") {
    //                 cmp *= -1;
    //             }
    //             return cmp;
    //         }

    //         return 0;
    //     });
    // }, [sortDescriptor]);

    return (
        <TableCard.Root className="w-full">
            <Table aria-label="Team members">
                <Table.Header>
                    <Table.Head label="รหัส" isRowHeader/>
                    <Table.Head label="ชื่อทั่วไป"/>
                    <Table.Head label="" />
                    <Table.Head label="" />
                </Table.Header>

                <Table.Body items={drugs}>
                    {(item) => (
                        <Table.Row id={item.id} href={`/drugs/${item.id}`} className=" hover:bg-gray-100 hover:cursor-pointer">
                            <Table.Cell className="whitespace-nowrap">{item.code}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.name}</Table.Cell>
                            <Table.Cell>
                                <Badges varient="status" status={item.riskLevel} />
                            </Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex justify-end gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="เพิ่มเติม" icon={DotsVertical} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <PaginationPageMinimalCenter 
                rounded={true} 
                page={currentPage} 
                total={10} 
                onPageChange={handlePageChange}
                className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};