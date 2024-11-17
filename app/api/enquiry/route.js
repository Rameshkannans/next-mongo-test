import enquiryModel from "@/models/enquiryModal";
import connectMongo from "@/utils/connectMongo";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        // Basic validation
        if (!name || !email || !message) {
            return Response.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Optional: Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const enquiry = { name, email, message };

        await connectMongo();
        await enquiryModel.create(enquiry);

        return Response.json({ message: 'Success' }, { status: 201 });
    } catch (error) {
        console.error('Error handling POST request:', error);
        return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
