"use client";

import { useEffect, useState, useTransition } from "react";
import { Post } from "@prisma/client";
import { updatePost, updatePostMetadata } from "@/lib/actions";
import { Editor as NovelEditor } from "novel";
import TextareaAutosize from "react-textarea-autosize";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@heroui/react";
import { baseUrl } from "@/lib/utils";
import Link from "next/link";

export default function Editor({ post }: { post: Post }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<Post>(post);

  const url = `${baseUrl}/articles/${data.slug}`;
  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updatePost(data);
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data, startTransitionSaving]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {data.published && (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
        <Button isLoading={isPendingSaving} onPress={() => {
          startTransitionSaving(async () => {
            await updatePost(data);
          });
        }}>
          {isPendingSaving ? "Saving..." : "Saved"}
        </Button>
        <Button
          onPress={() => {
            console.log(data.published, typeof data.published);
            const now = new Date();
            const updatePostMetadataPublishedObj = {
              formData: String(!data.published), slug: post.slug, key: "published"
            }
            const updatePostMetadataPublishedDateObj = {
              formData: now, slug: post.slug, key: "publishedAt"
            }
            startTransitionPublishing(async () => {
              Promise.all([
                await updatePostMetadata(updatePostMetadataPublishedObj).then(
                  () => {
                    toast.success(
                      `Successfully ${data.published ? "unpublished" : "published"
                      } your post.`,
                    );
                    setData((prev: any) => ({ ...prev, published: !prev.published }));
                  },
                ),
                await updatePostMetadata(updatePostMetadataPublishedDateObj).then(
                  () => {
                    setData((prev: any) => ({ ...prev, publishedAt: now }));
                  },
                ),
              ])
            });
          }}
          className={"flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none"}
          isLoading={isPendingPublishing}
        >
          {data.published ? "Unpublish" : "Publish"}
        </Button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <input
          type="text"
          placeholder="Title"
          defaultValue={post?.title || ""}
          autoFocus
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="dark:placeholder-text-600 border-none px-0 text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
        <TextareaAutosize
          placeholder="Description"
          defaultValue={post?.description || ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
      </div>
      <NovelEditor
        className="relative block"
        defaultValue={post?.content || undefined}
        onUpdate={(editor) => {
          setData((prev: any) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }));
        }}
        onDebouncedUpdate={() => {
          if (
            data.title === post.title &&
            data.description === post.description &&
            data.content === post.content
          ) {
            return;
          }
          startTransitionSaving(async () => {
            await updatePost(data);
          });
        }}
        disableLocalStorage={true}
      />
    </div>
  );
}