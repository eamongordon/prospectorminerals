'use client'

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";
import { Mineral } from "@prisma/client";

export default function PropertyTable({ mineral }: { mineral: Mineral }) {
    let tableData = [];
    if (mineral.chemical_formula) {
        tableData.push({ property: "Chemical Formula", value: mineral.chemical_formula });
    }
    if (mineral.hardness_min && mineral.hardness_max) {
        tableData.push({ property: "Hardness", value: mineral.hardness_min === mineral.hardness_max ? mineral.hardness_min.toString() : mineral.hardness_min.toString() + '-' + mineral.hardness_max.toString() });
    }
    if (mineral.crystal_system) {
        tableData.push({ property: "Crystal System", value: mineral.crystal_system });
    }
    if (mineral.mineral_class) {
        tableData.push({ property: "Mineral Class", value: mineral.mineral_class });
    }
    return tableData.length ? (
        <Table shadow="none">
            <TableHeader>
                <TableColumn className="text-md">Properties</TableColumn>
                <TableColumn><></></TableColumn>
            </TableHeader>
            <TableBody>
                {tableData.map((row, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{row.property}</TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table >
    ) : (<></>)
}