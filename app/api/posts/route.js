import connectMongo from "@/utils/connectMongo.js";
import PostModel from "@/models/postModel.js";

export async function GET(req) {
    const search = req.nextUrl.searchParams.get('q');
    console.log(search);

    try {
        await connectMongo();

        // Filter
        let postData;
        if (search) {
            postData = await PostModel.find({
                $or: [
                    { title: new RegExp(search, 'i') },  // Corrected from 'tittle' to 'title'
                    { description: new RegExp(search, 'i') }
                ]
            });
        } else {
            postData = await PostModel.find({});
        }

        // Fetching all posts
        return new Response(JSON.stringify(postData), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
