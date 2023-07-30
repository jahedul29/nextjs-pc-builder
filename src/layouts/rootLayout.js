import Navbar from "../components/shared/navbar";

const RootLayout = ({ children }) => {
    return (
        <main className="w-full">
            <Navbar />
            <div className="min-h-screen w-full">
                {children}
            </div>
        </main>
    );
};

export default RootLayout;