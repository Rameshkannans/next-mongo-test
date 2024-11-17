import connectMongo from "@/utils/connectMongo.js";
import PostModel from "@/models/postModel.js";

export async function GET(req, {params}) {
    try {
        await connectMongo();

        
        // Fetching all posts
        const postData = await PostModel.findOne({_id : params.id});

        return new Response(JSON.stringify(postData), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
