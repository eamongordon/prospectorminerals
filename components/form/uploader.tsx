"use client";

import { cn, resizeImage } from "@/lib/utils";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function Uploader({
  defaultValue,
  name,
  formFunction
}: {
  defaultValue: string | null;
  name: "image" | "avatar";
  formFunction?: Function
}) {
  const aspectRatio = name === "image" ? "aspect-video" : "aspect-square";

  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState({
    [name]: defaultValue,
  });

  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (file: File | null) => {
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        toast.error("File size too big (max 50MB)");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg")
      ) {
        toast.error("Invalid file type (must be .png, .jpg, or .jpeg)");
      } else {
        if (formFunction) {
          let formattedFileType;
          if (file.type === 'image/jpeg') {
            formattedFileType = "JPEG"
          } else {
            formattedFileType = "PNG"
          }
          if (name === "avatar") {
            resizeImage(file, 240, 240, 80).then((newfile) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                setData((prev) => ({ ...prev, [name]: e.target?.result as string }));
              };
              reader.readAsDataURL(newfile as Blob);
              formFunction(newfile);
            });
          } else {
            const reader = new FileReader();
            reader.onload = (e) => {
              setData((prev) => ({ ...prev, [name]: e.target?.result as string }));
            };
            reader.readAsDataURL(file as Blob);
            formFunction(file);
          }
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, [name]: e.target?.result as string }));
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setData({ [name]: null });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (formFunction) {
      formFunction(null);
    }
  };

  return (
    <div>
      <label
        htmlFor={`${name}-upload`}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center border border-gray-300 bg-white dark:bg-stone-800 shadow-sm transition-all hover:bg-gray-50",
          aspectRatio,
          {
            "max-w-screen-md rounded-md": aspectRatio === "aspect-video",
            "max-w-[160px] rounded-full w-[160px] mt-0": aspectRatio === "aspect-square",
          },
        )}
      >
        <div
          className={cn("absolute z-[5] h-full w-full", { "rounded-full": aspectRatio === "aspect-square", "rounded-md": aspectRatio === "aspect-video" })}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            inputRef.current!.files = e.dataTransfer.files; // set input file to dropped file
            handleUpload(file);
          }}
        />
        <div
          className={`${dragActive ? "border-2 border-black" : ""
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center ${aspectRatio === "aspect-square" ? "rounded-full" : "rounded-md"} px-10 transition-all ${data[name]
              ? "bg-white/80 dark:bg-stone-800/80  opacity-0 hover:opacity-100 hover:backdrop-blur-md"
              : "bg-white dark:bg-stone-800 opacity-100 hover:bg-gray-50"
            }`}
        >
          <svg
            className={`${dragActive ? "scale-110" : "scale-100"
              } h-7 w-7 text-gray-500 dark:text-gray-200 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-200">
            Drag and drop or click to upload.
          </p>
          <span className="sr-only">Photo upload</span>
        </div>
        {data[name] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data[name] as string}
            alt="Preview"
            className={cn("h-full w-full object-cover", { "rounded-full": aspectRatio === "aspect-square", "rounded-md": aspectRatio === "aspect-video" })}
          />
        )}
        {data[name] && aspectRatio === "aspect-square" && (
          <button
            type="button"
            className="absolute z-10 top-2 right-2 p-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-700 rounded-full shadow-sm"
            onClick={removeImage}
          >
            <X size={16} />
          </button>
        )}
      </label>
      <div className={cn("mt-1 flex shadow-sm", { "rounded-full": aspectRatio === "aspect-square", "rounded-md": aspectRatio === "aspect-video" })}>
        <input
          id={`${name}-upload`}
          ref={inputRef}
          name={name}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.currentTarget.files && e.currentTarget.files[0];
            handleUpload(file);
          }}
        />
      </div>
    </div>
  );
}
