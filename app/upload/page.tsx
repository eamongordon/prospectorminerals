import Header from "@/components/header";
import Footer from "@/components/footer";
import Blurhash from "./blurhash";

export default async function SettingsPage() {
    return (
        <main>
            <Header />
            <Blurhash />
            <Footer />
        </main>
    );
}
