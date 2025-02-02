import { getPostData } from "@/lib/fetchers";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import MDX from "@/components/mdx";
import type { Metadata, ResolvingMetadata } from 'next'
import { placeholderBlurhash, toDateString } from "@/lib/utils";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const slug = decodeURIComponent(params.slug);

  const data = await getPostData(slug);

  const parentData = await parent;
  const previousImages = parentData.openGraph?.images || [];
  return {
    title: `${data?.title} | Prospector Minerals`,
    description: data?.description,
    openGraph: {
      ...parentData.openGraph,
      images: data?.image ? [data?.image] : previousImages,
      url: `/articles/${params.slug}`
    },
  }
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
      <main className="my-5">
        <div className="m-auto mb-10 gap-5 sm:gap-7 flex flex-col items-center justify-center md:w-7/12 text-center">
          <p className="m-auto w-10/12 text-sm text-stone-500 dark:text-stone-400 md:text-base">
            {toDateString(data.publishedAt || data.createdAt)}
          </p>
          <h1 className="font-title text-3xl font-bold text-stone-800 dark:text-white md:text-6xl">
            {data.title}
          </h1>
          <p className="text-base m-auto w-10/12 text-stone-600 dark:text-stone-400 md:text-lg">
            {data.description}
          </p>
        </div>
        <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:h-150 md:w-5/6 md:rounded-2xl lg:w-2/3">
          <BlurImage
            alt={data.title ?? "Article Image"}
            width={1200}
            height={630}
            className="h-full w-full object-cover"
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            src={data.image ?? "/Fluorite-164_horiz-Optimized.jpg"}
          />
        </div>
        <MDX source={data.transformedContent} />
      </main>
    </>
  );
}