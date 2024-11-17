"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function HomeClient() {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]); 
    const [error, setError] = useState(null);
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch posts initially
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true); 
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
                setAllPosts(data); 
            } catch (error) {
                setError('Could not load posts. Please try again later.'); 
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const searchPost = async (query) => {
        if (!query) {
            setPosts(allPosts);
            return;
        }
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError('Could not perform search. Please try again later.'); 
            console.error(error);
        } 
    };

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        searchPost(query); 
    };

    return (
        <>
            <main className="container mx-auto px-4 py-6">
                <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </main>

            <div className="flex justify-end px-4 my-5">
                <input
                    type="text"
                    ref={inputRef}
                    value={searchQuery} 
                    onChange={handleInputChange} 
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Search..."
                />
            </div>

            <div aria-live="polite">
                {isLoading ? (
                    <p>Loading posts...</p> 
                ) : error ? (
                    <p className="text-red-500">{error}</p> 
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <Link key={post._id} href={`/post/${post._id}`}>
                                <div className="border border-gray-200 p-4">
                                    <img className="w-full h-48 object-cover mb-4" src="https://picsum.photos/200" alt="Post Image" />
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                    <p className="text-gray-600">{post.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </>
    );
}
