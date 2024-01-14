
"use client"

import { createPhotoBulk } from "@/lib/actions";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";

export default function PhotoAdd() {
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [result, setResult] = useState('Paste in URL');
    function actionFunc() {
        setLoading(true);
        createPhotoBulk(textInput).then((res: any) => {
            setLoading(false);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Added photos to DB");
            }
        })
    }
    return (
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
            <div className="flex flex-col space-y-6">
                <h1 className="text-3xl font-semibold dark:text-white">
                    Add Photos to DB
                </h1>
                <Input placeholder="Enter JSON" type="text" onChange={(event) => setTextInput(event.target.value)} />
                <Button onClick={() => actionFunc()} isLoading={loading}>Confirm</Button>
                <p className="break-words">{result}</p>
            </div>
        </div>
    );
}
