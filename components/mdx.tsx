import { MDXRemote } from "next-mdx-remote/rsc";
import { replaceLinks } from "@/lib/remark-plugins";
import BlurImage from "@/components/blur-image";

export default function MDX({ source }: { source: string }) {
  const components = {
    a: replaceLinks,
    BlurImage
  };

  return (
    <article
      className={`prose-md prose prose-stone m-auto w-11/12 dark:prose-invert sm:prose-lg sm:w-3/4`}    >
      {/* @ts-expect-error */}
      <MDXRemote source={source} components={components} />
    </article>
  );
}