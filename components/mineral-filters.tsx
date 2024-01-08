"use client";

import React from "react";
import { Accordion, AccordionItem, Slider, CheckboxGroup, Checkbox, Input } from "@nextui-org/react";
import { Search } from 'lucide-react';

export default function MineralFilters() {
    const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    /*
        const mapAccordionItems = (label: string, value: string, optionsArray: [], stateName: string) => {
            return (
                <CheckboxGroup
                    isRequired
                    description="Select lusters to filter by"
                    isInvalid={isLusterInvalid}
                    label="Select lusters"
                    defaultValue={optionsArray}
                    onValueChange={(value) => {
                        setIsLusterInvalid(value.length < 1);
                    }}
                >
                    {optionsArray.forEach((option) => {
                        <CheckboxGroup
                            isRequired
                            description="Select lusters to filter by"
                            isInvalid={isLusterInvalid}
                            label="Select lusters"
                            defaultValue={optionsArray}
                            onValueChange={(value) => {
                                setIsLusterInvalid(value.length < 1);
                            }}
                        >
                            {optionsArray.forEach(() => {
    
                            })}
                        </CheckboxGroup>
                    })}
                </CheckboxGroup>
            )
        }
    */
    const [isLusterInvalid, setIsLusterInvalid] = React.useState(false);
    const [isStreakInvalid, setIsStreakInvalid] = React.useState(true);
    return (
        <>
            <Input
                type="text"
                label="Search"
                placeholder="Search"
                labelPlacement="outside"
                endContent={
                    <Search />
                }
            />
            <Accordion>
                <AccordionItem key="hardness" aria-label="Hardness" title="Hardness">
                    <Slider
                        label="Price Range"
                        step={1}
                        showTooltip={true}
                        color="foreground"
                        minValue={0}
                        maxValue={10}
                        defaultValue={[0, 10]}
                        className="max-w-md"
                    />
                </AccordionItem>
                <AccordionItem key="2" aria-label="Lusters" title="Lusters">
                    <CheckboxGroup
                        isRequired
                        color="default"
                        description="Select lusters to filter by"
                        isInvalid={isLusterInvalid}
                        label="Select lusters"
                        defaultValue={["silky", "vitreous", "waxy", "submetallic", "metallic", "resinous", "pearly", "greasy", "dull", "adamantine"]}
                        onValueChange={(value) => {
                            setIsLusterInvalid(value.length < 1);
                        }}
                    >
                        <Checkbox value="silky">Silky</Checkbox>
                        <Checkbox value="vitreous">Vitreous</Checkbox>
                        <Checkbox value="waxy">Waxy</Checkbox>
                        <Checkbox value="submetallic">Submetallic</Checkbox>
                        <Checkbox value="metallic">Metallic</Checkbox>
                        <Checkbox value="resinous">Resinous</Checkbox>
                        <Checkbox value="pearly">Pearly</Checkbox>
                        <Checkbox value="greasy">Greasy</Checkbox>
                        <Checkbox value="dull">Dull</Checkbox>
                        <Checkbox value="adamantine">Adamantine</Checkbox>
                    </CheckboxGroup>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Streak" title="Streak">
                    {defaultContent}
                </AccordionItem>

            </Accordion>
        </>
    );
}
