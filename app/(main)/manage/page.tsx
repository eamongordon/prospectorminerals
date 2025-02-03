import Blurhash from "@/components/manage/blurhash";
import PhotoAdd from "@/components/manage/photo-items";

export default async function SettingsPage() {
    return (
        <main>
            <Blurhash />
            <PhotoAdd />
        </main>
    );
}
