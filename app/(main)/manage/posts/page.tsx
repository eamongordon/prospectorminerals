import CreatePostButton from "@/components/manage/posts/create-post-button";
import Posts from "@/components/manage/posts/posts";
import { getSession } from "@/lib/auth";
import { baseUrl } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SitePosts() {

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const url = `${baseUrl}/articles`;

  return (
    <div className="mx-8">
      <div className="flex flex-col items-center justify-between my-4 gap-2 sm:flex-row">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            All Posts
          </h1>
          <Link
            href={url}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </Link>
        </div>
        <CreatePostButton />
      </div>
      <Posts />
    </div>
  );
}