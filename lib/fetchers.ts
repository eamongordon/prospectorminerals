import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { serialize } from "next-mdx-remote/serialize";

export async function getPostsForSite() {

  return await unstable_cache(
    async () => {
      return prisma.post.findMany({
        where: {
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`posts`],
    {
      revalidate: 900,
      tags: [`posts`],
    },
  )();
}

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

      const mdxSource = await getMdxSource(data.content!)

      return {
        ...data,
        mdxSource
      };
    },
    [`post-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`post-${slug}`],
    },
  )();
}

async function getMdxSource(postContents: string) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
  // Serialize the content string into MDX
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
    },
  });

  return mdxSource;
}