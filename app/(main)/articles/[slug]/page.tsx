import { getPostData } from "@/lib/fetchers";
import { notFound } from "next/navigation";
//import BlogCard from "@/components/blog-card"
import BlurImage from "@/components/blur-image";
import MDX from "@/components/mdx";
import { placeholderBlurhash, toDateString } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);

  const data = await getPostData(slug);

  if (!data) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    }
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   siteData.customDomain && {
    //     alternates: {
    //       canonical: `https://${siteData.customDomain}/${params.slug}`,
    //     },
    //   }),
  };
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const data = await getPostData(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center">
          <div className="m-auto w-full text-center md:w-7/12">
            <p className="m-auto my-5 w-10/12 text-sm text-stone-500 dark:text-stone-400 md:text-base">
              {toDateString(data.publishedAt || data.createdAt)}
            </p>
            <h1 className="mb-10 font-title text-3xl font-bold text-stone-800 dark:text-white md:text-6xl">
              {data.title}
            </h1>
            <p className="mb-10 text-md m-auto w-10/12 text-stone-600 dark:text-stone-400 md:text-lg">
              {data.description}
            </p>
          </div>
        </div>
        <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:h-150 md:w-5/6 md:rounded-2xl lg:w-2/3">
          <BlurImage
            alt={data.title ?? "Post image"}
            width={1200}
            height={630}
            className="h-full w-full object-cover"
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            src={data.image ?? "/placeholder.png"}
          />
        </div>

        <MDX source={data.mdxSource} />

        {data.adjacentPosts.length > 0 && (
          <div className="relative mb-20 mt-10 sm:mt-20">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-stone-300 dark:border-stone-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
                Continue Reading
              </span>
            </div>
          </div>
        )}
        {data.adjacentPosts && (
          /*
          <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
            {data.adjacentPosts.map((data: any, index: number) => (
              <BlogCard key={index} data={data} />
            ))}
          </div>*/
          <></>
        )}
      </main>
    </>
  );
}