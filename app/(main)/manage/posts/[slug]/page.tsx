import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updatePostMetadata } from "@/lib/actions";
import Editor from "@/components/editor";
import DeletePostForm from "@/components/form/delete-post-form";
import Form from '@/components/form';
import PostPageLayout from "@/components/manage/posts/post-page-layout";

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

                <DeletePostForm postName={data?.title!} />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

/*
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
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

        <DeletePostForm postName={data?.title!} />
      </div>
    </div>
*/