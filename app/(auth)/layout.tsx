import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession();
    if (session) {
        return redirect(`/account/settings`);
    }
    return ({ children })
}