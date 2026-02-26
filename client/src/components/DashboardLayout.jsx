import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import PageWrapper from "./PageWrapper";

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardNavbar />
                <main className="flex-1 overflow-x-hidden p-6 md:p-8">
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
