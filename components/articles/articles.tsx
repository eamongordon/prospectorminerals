
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
