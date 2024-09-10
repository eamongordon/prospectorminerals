"use client";

import { deletePost } from "@/lib/actions";
import { Button } from "@nextui-org/react";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function DeletePostForm({ postName }: { postName: string }) {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  return (
    <form
      action={async () =>
        window.confirm("Are you sure you want to delete your post?") &&
        deletePost(slug).then((res) => {
            va.track("Deleted Post");
            router.refresh();
            router.push(`/manage/posts`);
            toast.success(`Successfully deleted post!`);
        }).catch((error) => {
          toast.error(error);
        })
      }
      className="rounded-lg border border-red-600 bg-white dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="text-xl dark:text-white">Delete Post</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Deletes your post permanently. Type in the name of your post{" "}
          <b>{postName}</b> to confirm.
        </p>

        <input
          name="confirm"
          type="text"
          required
          pattern={postName}
          placeholder={postName}
          className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
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
      isLoading={pending}
      type="submit"
    >
      Delete Post
    </Button>
  );
}
