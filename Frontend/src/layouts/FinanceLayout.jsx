import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const FinanceLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f4f6f3]">

      <Sidebar />

      <main className="min-h-screen lg:ml-[260px]">

        <Topbar />

        <div className="p-5 md:p-8">
          {children}
        </div>

      </main>

    </div>
  );
};

export default FinanceLayout;