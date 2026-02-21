import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEmails: 0,
    emailsThisWeek: 0,
    savedDrafts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/email/stats", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await res.json();

        if (data.success) {
          setStats({
            totalEmails: data.totalEmails,
            emailsThisWeek: data.emailsThisWeek,
            savedDrafts: data.savedDrafts,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#EEF3F5] text-gray-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col py-6 px-4 sticky top-0 h-screen shadow-md">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-[#1F2A37]">
              AI Email Composer
            </h1>
          </div>

          <nav className="space-y-2 flex-1">
            <button className="w-full text-left px-3 py-2 rounded-lg bg-[#EEF3F5] text-[#1F2A37] font-semibold">
              Dashboard
            </button>

            <button
              onClick={() => navigate("/create-email")}
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-[#EEF3F5] transition-colors"
            >
              Create Email
            </button>

            <button
              type="button"
              onClick={() => navigate("/email-history")}
              className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-[#EEF3F5] transition-colors"
            >
              Email History
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#1F2A37]">
                  Welcome back
                </h2>
                <p className="text-gray-600 mt-1">
                  Here&apos;s a quick overview of your email activity.
                </p>
              </div>

              <button
                onClick={() => navigate("/create-email")}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#1F2A37] text-white font-medium shadow-md hover:bg-[#111827] transition-colors"
              >
                Create New Email
              </button>
            </header>

            {/* Stats cards */}
            <section className="grid gap-6 sm:grid-cols-3 mb-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-600 mb-2">Total Emails</p>
                <p className="text-3xl font-bold text-[#1F2A37]">
                  {stats.totalEmails}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-600 mb-2">
                  Emails This Week
                </p>
                <p className="text-3xl font-bold text-[#1F2A37]">
                  {stats.emailsThisWeek}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-gray-600 mb-2">Saved Drafts</p>
                <p className="text-3xl font-bold text-[#1F2A37]">
                  {stats.savedDrafts}
                </p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <p className="text-gray-600">
                Analytics connected successfully. More advanced charts and
                insights can be added next.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;