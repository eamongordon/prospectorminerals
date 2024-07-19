import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

export async function getPostData(slug: string) {
  return await unstable_cache(
    async () => {
      const data = await prisma.post.findFirst({
        where: {
          slug,
          published: true,
        }
      });

      if (!data) return null;

      const transformedContent = getTransformedContent(data.content!);

      return {
        ...data,
        transformedContent
      };
    },
    [`post-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`post-${slug}`],
    },
  )();
}

const getTransformedContent = (postContents: string): string =>
    // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";