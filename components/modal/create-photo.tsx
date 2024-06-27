"use client";

//import { createContact } from "@/lib/functions/contacts/contacts";
import Form from '@/components/form';
import LoadingDots from "@/components/icons/loading-dots";
import { createPhoto } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useModal } from "./provider";

export default function CreateContactModal({ organizationId }: { organizationId: string }) {
  const router = useRouter();
  const modal = useModal();
  const [data, setData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  /*
  useEffect(() => {
    setData((prev) => ({
      ...prev
    }));
  }, [data.name]);
*/
  return (
    <div className="relative flex flex-col space-y-4 p-5 md:p-10">
      <h2 className="font-cal text-2xl dark:text-white">Create a new contact</h2>
      <div className="flex flex-col space-y-2">
      <Form
        title="Thumbnail image"
        description="The thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 1200x630."
        inputAttrs={{
          name: "image",
          type: "file"
        }}
        handleSubmit={createPhoto}
      />
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <CreateSiteFormButton />
      </div>
    </div>
  );
}
function CreateSiteFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Create Contact</p>}
    </button>
  );
}
