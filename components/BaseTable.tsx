"use client";

import { useState } from "react";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { ButtonUtility } from "./base/buttons/button-utility";
import { DotsVertical } from "@untitledui/icons";

export type Column<T> = {
  key: string;
  label: string;
  isRowHeader?: boolean;
  className?: string;
  render: (item: T) => React.ReactNode;
};

type Props<T extends object> = {
  items: T[];
  columns: Column<T>[];
  getRowId: (item: T) => number;
  getRowHref?: (item: T) => string;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalPages?: number;
  rowNumber?: number;
};

export default function BaseTable<T extends object>({
  items,
  columns,
  getRowId,
  getRowHref,
  currentPage,
  setCurrentPage,
  totalPages,
  rowNumber = 6,
}: Props<T>) {

  type RowType<T> =
    | { type: "data"; value: T }
    | { type: "empty"; id: string };
  const emptyCount = Math.max(0, rowNumber - items.length);

  const filledItems: RowType<T>[] = [
    ...items.map((item) => ({ type: "data" as const, value: item })),
    ...Array.from({ length: emptyCount }, (_, i) => ({
      type: "empty" as const,
      id: `empty-${i}`,
    })),
  ];
  return (
    <TableCard.Root className="w-full">
      <Table aria-label="data table">
        <Table.Header>
          {columns.map((col) => (
            <Table.Head
              key={col.key}
              label={col.label}
              isRowHeader={col.isRowHeader}
              className={col.className}
            />
          ))}
            <Table.Head label="" />
        </Table.Header>

        <Table.Body items={filledItems}>
          {(row) => {
            if (row.type === "empty") {
              return (
                <Table.Row id={row.id}>
                  {columns.map((col) => (
                    <Table.Cell key={col.key} className={`${col.className} `} />
                  ))}
                  <Table.Cell />
                </Table.Row>
              );
            }

            const item = row.value;

            return (
              <Table.Row
                id={getRowId(item)}
                href={getRowHref?.(item)}
                className="hover:bg-gray-100 hover:cursor-pointer"
              >
                {columns.map((col) => (
                  <Table.Cell key={col.key} className={col.className}>
                    {col.render(item)}
                  </Table.Cell>
                ))}
                <Table.Cell className="px-4">
                  <div className="flex justify-end gap-0.5">
                    <ButtonUtility size="xs" color="tertiary" tooltip="เพิ่มเติม" icon={DotsVertical} />
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table>

      <PaginationPageMinimalCenter
        rounded
        page={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
        className="px-4 py-3 md:px-6 md:pt-3 md:pb-4"
      />
    </TableCard.Root>
  );
}
