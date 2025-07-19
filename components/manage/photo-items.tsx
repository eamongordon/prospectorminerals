
"use client"

import { createPhotoBulk, createMineralBulk, createRelationsBulk, createLocalityBulk } from "@/lib/actions";
import { useState } from "react";
import { Button, Input, addToast } from "@heroui/react";

export default function PhotoAdd() {
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [result, setResult] = useState('Paste in URL');
    function actionFunc() {
        setLoading(true);
        createPhotoBulk(textInput).then((res: any) => {
            setLoading(false);
            if (res.error) {
                addToast({
                    color: "danger",
                    title: res.error
                });
            } else {
                addToast({
                    color: "success",
                    title: "Added photos to DB"
                });
            }
        })
    }
    function actionMineralsFunc() {
        setLoading(true);
        createMineralBulk(textInput).then((res: any) => {
            setLoading(false);
            if (res.error) {
                addToast({
                    color: "danger",
                    title: res.error
                });
            } else {
                addToast({
                    color: "success",
                    title: "Added minerals to DB"
                });
            }
        })
    }
    function actionRelationsFunc() {
        setLoading(true);
        createRelationsBulk(textInput).then((res: any) => {
            setLoading(false);
            if (res.error) {
                addToast({
                    color: "danger",
                    title: res.error
                });
            } else {
                addToast({
                    color: "success",
                    title: "Added relations to DB"
                });
            }
        })
    }
    function actionLocalitiesFunc() {
        setLoading(true);
        createLocalityBulk(textInput).then((res: any) => {
            setLoading(false);
            if (res.error) {
                addToast({
                    color: "danger",
                    title: res.error
                });
            } else {
                addToast({
                    color: "success",
                    title: "Added localities to DB"
                });
            }
        })
    }
    return (
        <>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="flex flex-col space-y-6">
                    <h1 className="text-3xl font-semibold dark:text-white">
                        Add Photos to DB
                    </h1>
                    <Input placeholder="Enter JSON" type="text" onChange={(event) => setTextInput(event.target.value)} />
                    <Button onPress={() => actionFunc()} isLoading={loading}>Confirm</Button>
                    <p className="break-words">{result}</p>
                </div>
            </div>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="flex flex-col space-y-6">
                    <h1 className="text-3xl font-semibold dark:text-white">
                        Add Minerals to DB
                    </h1>
                    <Input placeholder="Enter JSON" type="text" onChange={(event) => setTextInput(event.target.value)} />
                    <Button onPress={() => actionMineralsFunc()} isLoading={loading}>Confirm</Button>
                    <p className="break-words">{result}</p>
                </div>
            </div>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="flex flex-col space-y-6">
                    <h1 className="text-3xl font-semibold dark:text-white">
                        Add Localities to DB
                    </h1>
                    <Input placeholder="Enter JSON" type="text" onChange={(event) => setTextInput(event.target.value)} />
                    <Button onPress={() => actionLocalitiesFunc()} isLoading={loading}>Confirm</Button>
                    <p className="break-words">{result}</p>
                </div>
            </div>
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="flex flex-col space-y-6">
                    <h1 className="text-3xl font-semibold dark:text-white">
                        Add Relations Mineral and Photo to DB
                    </h1>
                    <Input placeholder="Enter JSON" type="text" onChange={(event) => setTextInput(event.target.value)} />
                    <Button onPress={() => actionRelationsFunc()} isLoading={loading}>Confirm</Button>
                    <p className="break-words">{result}</p>
                </div>
            </div>
        </>
    );
}
