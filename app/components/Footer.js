export default function Footer() {
    return (
        <>
            <footer className="bg-gray-800 text-white mt-10 py-6"> {/* Added footer */}
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-sm">&copy; 2024 Blog. All rights reserved.</p>
                    <nav className="space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a> {/* Footer link */}
                        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a> {/* Footer link */}
                        <a href="#" className="text-gray-400 hover:text-white">Support</a> {/* Footer link */}
                    </nav>
                </div>
            </footer>
        </>
    );
};