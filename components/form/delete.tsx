"use client";

import { deleteUser, deletePost } from "@/lib/actions";
import { Button, Input } from "@nextui-org/react";
import va from "@vercel/analytics";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteFormProps {
    type: "user" | "post";
    name?: string;
}

export default function DeleteForm({ type, name }: DeleteFormProps) {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { slug } = useParams() as { slug: string };

    const submitForm = async () => {
        setLoading(true);
        if (window.confirm(`Are you sure you want to delete your ${type}?`)) {
            try {
                if (type === "user") {
                    await deleteUser();
                    va.track("Deleted User");
                    signOut({ callbackUrl: "/" });
                    toast.success(`Account deleted.`);
                } else if (type === "post") {
                    await deletePost(slug);
                    va.track("Deleted Post");
                    router.refresh();
                    router.push(`/manage/posts`);
                    toast.success(`Successfully deleted post!`);
                }
            } catch (err: unknown) {
                toast.error(`There was an error deleting your ${type}. Please try again later.`);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-lg border border-red-600 bg-white dark:bg-black">
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
                <h2 className="text-xl dark:text-white">Delete {type === "user" ? "Account" : "Post"}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                    {type === "user"
                        ? "Deletes your account and all data associated with it. Type DELETE to confirm."
                        : `Deletes your post permanently. Type in the name of your post ${name} to confirm.`}
                </p>

                <Input
                    name="confirm"
                    type="text"
                    required
                    pattern={type === "user" ? "DELETE" : name}
                    placeholder={type === "user" ? "DELETE" : name}
                    onChange={(event) => setData(event.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (data === (type === "user" ? "DELETE" : name)) {
                                e.preventDefault(); // Prevent the default action to avoid submitting the form
                                submitForm();
                            } else {
                                toast.error(`Please type ${type === "user" ? "DELETE" : name} to confirm.`);
                            }
                        }
                    }}
                />
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                <p className="text-center text-sm text-stone-500 dark:text-stone-400">
                    This action is irreversible. Please proceed with caution.
                </p>
                <Button
                    color="danger"
                    onClick={() => submitForm()}
                    isLoading={loading}
                    isDisabled={data !== (type === "user" ? "DELETE" : name)}
                >
                    <p>Confirm Delete</p>
                </Button>
            </div>
        </div>
    );
}