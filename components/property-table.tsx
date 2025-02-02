'use client'

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";

type TableData = {
    property: string;
    value: string;
}

export default function PropertyTable({ data }: { data: TableData[] }) {
    return data.length > 0 && (
        <Table shadow="none" aria-label="Properties">
            <TableHeader>
                <TableColumn className="text-base">Properties</TableColumn>
                <TableColumn><></></TableColumn>
            </TableHeader>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row.property}</TableCell>
                        <TableCell className="[overflow-wrap:anywhere]">{row.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}