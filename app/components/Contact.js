"use client";

import { useState } from "react";

export default function ContactClient() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null); // State for error handling
    const [successMessage, setSuccessMessage] = useState(null); // State for success message

    const handleInput = (e) => {
        const { name, value } = e.target; 
        setInputs((prevState) => ({
            ...prevState, 
            [name]: value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs), 
            });

            if (!response.ok) {
                throw new Error('Failed to submit enquiry');
            }

            const result = await response.json();
            setSuccessMessage('Your message has been sent successfully!'); 
            setInputs({}); 
            setTimeout(()=>{
                setSuccessMessage("");
            },4000)
        } catch (error) {
            setError('Could not submit your enquiry. Please try again later.'); 
            console.error(error); 
            setTimeout(()=>{
                setError("");
            },4000)
        }
    };

    return (
        <>
            <main className="container mx-auto px-4 py-6">
                <h2 className="text-4xl font-bold mb-4">Contact Us</h2>

                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>} 

                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex items-center mb-4">
                        <label htmlFor="name" className="w-1/4">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="border rounded px-2 py-1 w-3/4"
                            onChange={handleInput}
                            value={inputs.name ?? ""}
                            name="name"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="email" className="w-1/4">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="border rounded px-2 py-1 w-3/4"
                            onChange={handleInput}
                            value={inputs.email ?? ""}
                            name="email"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="message" className="w-1/4">Message:</label>
                        <textarea
                            id="message"
                            className="border rounded px-2 py-1 w-3/4"
                            rows="4"
                            onChange={handleInput}
                            value={inputs.message ?? ""}
                            name="message"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </main>
        </>
    );
}