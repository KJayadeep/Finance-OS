import { Bell } from "lucide-react";
import { useState } from "react";
import moment from "moment";
import ProfileCard from "./ProfileCard";

const Topbar = () => {
  const [showProfile,setShowProfile] = useState(false);
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-8">

      <div>

        <p className="text-xs text-slate-400">
          {moment().format("dddd, DD MMMM YYYY")}
        </p>

        <h2 className="mt-1 text-lg font-bold text-slate-900">
          Finance OS
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <button className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
          <Bell size={18} />
        </button>

        <button onClick={()=>setShowProfile(!showProfile)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a3e635] text-sm font-bold text-slate-900">
          JD
        </button>

        {showProfile && (
          <ProfileCard onClose={()=> setShowProfile(false)} />
        )}

      </div>

    </header>
  );
};

export default Topbar;