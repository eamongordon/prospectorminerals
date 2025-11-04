"use client";

import { useState } from "react";
import { Chip, Textarea } from "@heroui/react";

export interface ChemistryChipsInputProps {
  value?: string[];
  onChange: (values: string[] | undefined) => void;
  label?: string;
  placeholder?: string;
  description?: string;
}

export default function ChemistryChipsInput({
  value,
  onChange,
  label = "Chemical Formulas",
  placeholder = 'Try "Cu" or "SiO2"',
  description = 'Type an element or formula and hit "enter"',
}: ChemistryChipsInputProps) {
  const [input, setInput] = useState<string | undefined>(undefined);

  const commitToken = () => {
    const token = (input || "").trim();
    if (!token.length) return;
    const existing = value ? [...value] : [];
    if (!existing.includes(token)) {
      onChange([...existing, token]);
    }
    setInput("");
  };

  return (
    <Textarea
      type="text"
      label={label}
      description={description}
      placeholder={!value ? placeholder : ""}
      value={input || ""}
      classNames={{
        innerWrapper: ["flex flex-wrap"],
        input: [value ? "mb-1" : null],
      }}
      minRows={1}
      size="md"
      onValueChange={setInput}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitToken();
        }
        if (e.key === "Backspace" && !e.currentTarget.value.length) {
          const current = value ? [...value] : [];
          current.pop();
          onChange(current.length ? current : undefined);
        }
      }}
      endContent={
        value?.map((val: string, index: number) => (
          <Chip
            classNames={{ base: "mr-1 min-h-[28px]" }}
            size="md"
            onClose={() => {
              const newArray = value?.filter((chemval) => chemval !== val) || [];
              onChange(newArray.length ? newArray : undefined);
            }}
            key={index}
            variant="flat"
          >
            {val}
          </Chip>
        ))
      }
    />
  );
}
