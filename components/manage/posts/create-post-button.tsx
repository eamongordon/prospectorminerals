"use client";

import { createPost } from "@/lib/actions";
import { Button } from "@nextui-org/react";
import va from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function CreatePostButton() {
  const router = useRouter();
  //const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          const post = await createPost();
          va.track("Created Post");
          router.refresh();
          if ('slug' in post) {
            router.push(`/manage/posts/${post.slug}`);
          } else {
            console.error("Post creation failed:", post);
          }
        })
      }
      isLoading={isPending}
    >
      Create New Post
    </Button>
  );
}