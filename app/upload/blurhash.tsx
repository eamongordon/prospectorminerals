
"use client"

import { getBlurDataURL } from "@/lib/utils";
import { use, useState } from "react";
import { Button, Input } from "@nextui-org/react";

export default function Blurhash() {
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [result, setResult] = useState('Paste in URL');
    function blurFunc() {
        setLoading(true);
        getBlurDataURL(textInput).then((res) => {
            setLoading(false);
            setResult(res);
        })
    }
    return (
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
            <div className="flex flex-col space-y-6">
                <h1 className="text-3xl font-semibold dark:text-white">
                    Get Blur Hash
                </h1>
                <Input placeholder="Enter a URL" type="text" onChange={(event) => setTextInput(event.target.value)} />
                <Button onClick={() => blurFunc()} isLoading={loading}>Get Blur</Button>
                <p className="break-words">{result}</p>
            </div>
        </div>
    );
}
