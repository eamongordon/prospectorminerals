import { fetchPhotos } from "@/lib/fetchers";

type FetchPhotosParams = Parameters<typeof fetchPhotos>[0];

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const { searchParams } = url;

        const object = JSON.parse(searchParams.get("object")!) as FetchPhotosParams;
        const photos = await fetchPhotos(object);
        
        return Response.json(photos);
    } catch (error) {
        console.error("Error fetching photos:", error);
        return Response.json({ error: "Failed to fetch photos" }, { status: 500 });
    }
}
