import { fetchPosts } from "@/lib/fetchers";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const { searchParams } = url;

        const filterObj = searchParams.get("filter") ? JSON.parse(searchParams.get("filter")!) : undefined;
        const cursor = searchParams.get("cursor") ? parseInt(searchParams.get("cursor")!) : undefined;
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;
        const sortObj = searchParams.get("sortBy") && searchParams.get("sort")
            ? { property: searchParams.get("sortBy")!, order: searchParams.get("sort")! as "asc" | "desc" }
            : undefined;
        const fieldset = searchParams.get("fieldset") || "display";

        const articles = await fetchPosts({ filterObj, cursor, limit, sortObj, fieldset });

        return Response.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return Response.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}
