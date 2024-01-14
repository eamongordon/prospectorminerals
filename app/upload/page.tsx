import Header from "@/components/header";
import Footer from "@/components/footer";
import Blurhash from "./blurhash";
import PhotoAdd from "./photoItems";

export default async function SettingsPage() {
    return (
        <main>
            <Header />
            <Blurhash />
            <PhotoAdd />
            <Footer />
        </main>
    );
}
