"use client";

import { fetchMinerals } from "@/lib/actions";
import { Button } from "@nextui-org/react"

export default function TestServerActions() {
    function mineralGet() {
        fetchMinerals({filterObj:{names: ["Test"]}}).then((res) => {
            console.log("A")
            console.log(res);
        });
    };
    return (
        <div>
            <Button onClick={() => mineralGet()}>Test Mineral Query</Button>
        </div>
    )
}