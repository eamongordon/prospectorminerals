"use client";

import { deleteUser } from "@/lib/actions";
import { Button, Input } from "@nextui-org/react";
import va from "@vercel/analytics";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteUserForm() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formUpdate = (event: any) => {
    setData(event.target.value);
  }
  function submitForm() {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser()
        .then(async (res) => {
          //@ts-expect-error
          if (res.error) {
            //@ts-expect-error
            toast.error(res.error);
          } else {
            va.track("Deleted User");
            signOut({ callbackUrl: "/" });
            toast.success(`Account deleted.`);
          }
        })
        .catch((err: Error) => toast.error(err.message))
    }
  }
  return (
    <div
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
          onChange={formUpdate}
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          This action is irreversible. Please proceed with caution.
        </p>
          <Button
            color="danger"
            onClick={() => submitForm()}
            isLoading={loading}
            isDisabled={data === "DELETE" ? false : true}
          >
            <p>Confirm Delete</p>
          </Button>
      </div>
    </div>
  );
}