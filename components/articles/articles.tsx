import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Sites({ limit }: { limit?: number }) {
  const articles = []/*await prisma.site.findMany({
    where: {
      user: {
        id: session.user.id as string,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    ...(limit ? { take: limit } : {}),
  });*/

  return articles.length > 0 ? (
    <></>
  ) : (
    <></>
  );
}
