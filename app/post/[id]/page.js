import PostClient from "@/app/components/post";

// Fetch post data and generate metadata dynamically based on post details
export async function generateMetadata({ params }) {
    const { id } = params;

    // Fetch post data from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }

    const post = await response.json();

    return {
        title: post.title || 'Post',
        description: post.description || 'Post details',
    };
}

export default function PostServer({ params }) {
    return <PostClient params={params} />;
}
