"use client";

import { deleteUser, deletePost } from "@/lib/actions";
import { Button, Input } from "@heroui/react";
import va from "@vercel/analytics";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteFormProps {
    type: "account" | "post";
    name?: string;
}

export default function DeleteForm({ type, name }: DeleteFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isInputValid, setIsInputValid] = useState(false);
    const { slug } = useParams() as { slug: string };
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = () => {
        if (inputRef.current) {
            setIsInputValid(inputRef.current.checkValidity());
        }
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (isInputValid && window.confirm(`Are you sure you want to delete your ${type}?`)) {
            try {
                if (type === "account") {
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
        <form onSubmit={submitForm} className="rounded-lg border border-red-600 bg-white dark:bg-black">
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
                <h2 className="text-xl dark:text-white">Delete {type === "account" ? "Account" : "Post"}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                    {type === "account"
                        ? "Deletes your account and all data associated with it. Type DELETE ACCOUNT to confirm."
                        : `Deletes your post permanently. Type in the name of your post, ${name}, to confirm.`}
                </p>

                <Input
                    name="confirm"
                    type="text"
                    required
                    pattern={type === "account" ? "DELETE ACCOUNT" : name}
                    placeholder={type === "account" ? "DELETE ACCOUNT" : name}
                    ref={inputRef}
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                <p className="text-center text-sm text-stone-500 dark:text-stone-400">
                    This action is irreversible. Please proceed with caution.
                </p>
                <Button
                    color="danger"
                    type="submit"
                    isLoading={loading}
                    isDisabled={!isInputValid}
                >
                    <p>Confirm Delete</p>
                </Button>
            </div>
        </form>
    );
}