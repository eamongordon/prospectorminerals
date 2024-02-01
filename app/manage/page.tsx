import Header from "@/components/header";
import Footer from "@/components/footer";
import Blurhash from "../../components/manage/blurhash";
import PhotoAdd from "../../components/manage/photoItems";

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
