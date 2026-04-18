import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import PageWrapper from "./PageWrapper";

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#f6f3ee] flex font-sans selection:bg-violet-100 selection:text-violet-900">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardNavbar />
                <main className="flex-1 overflow-x-hidden p-6 md:p-10 transition-all duration-500">
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
