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

export default function PropertyTable({mineral} : {mineral: Mineral}) {
    return (
        <Table shadow="none">
        <TableHeader>
            <TableColumn className="text-md">Properties</TableColumn>
            <TableColumn><></></TableColumn>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell className="font-semibold">Chemistry</TableCell>
                <TableCell>{mineral.chemical_formula}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-semibold">Hardness</TableCell>
                <TableCell>{mineral.hardness_min?.toString() + '-' + mineral.hardness_max?.toString()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-semibold">Crystal System</TableCell>
                <TableCell>{mineral.crystal_system}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-semibold">Mineral Class</TableCell>
                <TableCell>{mineral.mineral_class} </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    )
}