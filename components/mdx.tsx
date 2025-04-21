import { MDXRemote } from "next-mdx-remote/rsc";
import { replaceImgs, replaceLinks } from "@/lib/remark-plugins";

export default function MDX({ source }: { source: string }) {
  const components = {
    a: replaceLinks,
    img: replaceImgs
  };

  return (
    <article className="prose-md prose prose-stone m-auto w-11/12 dark:prose-invert sm:prose-lg sm:w-3/4">
      <MDXRemote source={source} components={components} />
    </article>
  );
}