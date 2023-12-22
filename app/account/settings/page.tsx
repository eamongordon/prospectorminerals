import { ReactNode } from "react";
import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { editUser } from "@/lib/actions";
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function SettingsPage() {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }
    return (
        <main>
            <Header />
            <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
                <div className="flex flex-col space-y-6">
                    <h1 className="font-cal text-3xl font-bold dark:text-white">
                        Settings
                    </h1>
                    <Form
                        title="Name"
                        description="Your name."
                        helpText="Please use 32 characters maximum."
                        inputAttrs={{
                            name: "name",
                            type: "text",
                            defaultValue: session.user.name!,
                            placeholder: "John Doe",
                            maxLength: 32,
                        }}
                        handleSubmit={editUser}
                    />
                    <Form
                        title="Email"
                        description="Your email address used to login."
                        helpText="Please enter a valid email."
                        inputAttrs={{
                            name: "email",
                            type: "email",
                            defaultValue: session.user.email!,
                            placeholder: "email@example.com",
                        }}
                        handleSubmit={editUser}
                    />
                </div>
            </div>
            <Footer />
        </main>
    );
}