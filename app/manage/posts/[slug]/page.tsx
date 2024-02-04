import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
    where: {
      slug: decodeURIComponent(params.slug),
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <>
      <Header />
      <Editor post={data} />
      <Footer />
    </>
  );
}