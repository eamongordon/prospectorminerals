"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { Input, Button } from "@nextui-org/react";
import { signOut } from "next-auth/react"
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { deleteUser } from "@/lib/actions";
import va from "@vercel/analytics";

export default function DeleteUserForm() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) =>
        window.confirm("Are you sure you want to delete your account?") &&
        deleteUser()
          .then(async (res) => {
            //@ts-expect-error
            if (res.error) {
              //@ts-expect-error
              toast.error(res.error);
            } else {
              va.track("Deleted User");
              signOut({callbackUrl: "/"});
              toast.success(`Account deleted.`);
            }
          })
          .catch((err: Error) => toast.error(err.message))
      }
      className="rounded-lg border border-red-600 bg-white dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="text-xl dark:text-white">Delete Account</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Deletes your account and all data associated with it. Type DELETE to confirm.
        </p>

        <Input
          name="confirm"
          type="text"
          required
          pattern={"DELETE"}
          placeholder={"DELETE"}
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          This action is irreversible. Please proceed with caution.
        </p>
        <div className="w-32">
          <FormButton />
        </div>
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      color="danger"
      isLoading={pending}
    >
      <p>Confirm Delete</p>
    </Button>
  );
}
