import Footer from "@/components/shared/footer";
import Navbar from "../components/shared/navbar";

const RootLayout = ({ children }) => {
    return (
        <main className="w-full">
            <Navbar />
            <div className="w-full" style={{ minHeight: '90vh' }}>
                {children}
            </div>
            <Footer />
        </main>
    );
};

export default RootLayout;