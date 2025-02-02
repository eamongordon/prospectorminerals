import Editor from "@/components/editor";
import Form from '@/components/form';
import DeleteForm from "@/components/form/delete";
import PostPageLayout from "@/components/manage/posts/post-page-layout";
import { updatePostMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
    where: {
      slug: decodeURIComponent(params.slug),
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col space-y-6 sm:p-10 justify-items-center items-center">
        <PostPageLayout
          editorElem={
            <Editor post={data} />
          }
          settingElem={
            <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
              <div className="flex flex-col space-y-6">
                <h1 className="text-3xl font-bold dark:text-white">
                  Post Settings
                </h1>
                <Form
                  title="Post Slug"
                  description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
                  helpText="Please use a slug that is unique to this post."
                  inputAttrs={{
                    name: "slug",
                    type: "text",
                    defaultValue: data?.slug!,
                    placeholder: "slug",
                  }}
                  handleSubmit={updatePostMetadata}
                />

                <Form
                  title="Thumbnail image"
                  description="The thumbnail image for your post. Accepted formats: .png, .jpg, .jpeg"
                  helpText="Max file size 50MB. Recommended size 1200x630."
                  inputAttrs={{
                    name: "image",
                    type: "file",
                    defaultValue: data?.image!,
                  }}
                  handleSubmit={updatePostMetadata}
                />

                <DeleteForm type="post" name={data?.title!} />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}