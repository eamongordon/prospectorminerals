import CreatePostButton from "@/components/manage/posts/create-post-button";
import Posts from "@/components/manage/posts/posts";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SitePosts() {

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const url = `${process.env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL : "http://" + "localhost:3001"}/articles`;

  return (
    <div className="mx-8">
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            All Posts
          </h1>
          <a
            href={url
              /*
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
                */
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
        <CreatePostButton />
      </div>
      <Posts />
    </div>
  );
}