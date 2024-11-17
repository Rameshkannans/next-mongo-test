"use client"; 

import { useEffect, useState } from "react";

export default function PostClient({ params }) {
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const id = params.id;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-6">
            <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
            <p className="text-orange-500">{post.created_at}</p>
            <img src="https://picsum.photos/200" alt="Post Image" className="my-4" />
            <p>{post.image}</p>
        </main>
    );
}
