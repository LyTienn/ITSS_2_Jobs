import { NavLink, useLocation } from "react-router-dom";
import { useSavedJobs } from "../../hooks/useSavedJobs";

export function SiteHeader() {
  const location = useLocation();
  const shouldKeepJobsSearch = location.pathname === "/jobs" || location.pathname === "/jobs/filter";
  const jobsSearch = shouldKeepJobsSearch ? location.search : "";
  const { savedJobIds } = useSavedJobs();

  return (
    <header className="sticky top-0 z-50 h-20 shrink-0 border-b border-line/80 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <NavLink to="/jobs" className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
          JobFit
        </NavLink>
        <nav className="flex shrink-0 items-center gap-1 rounded-full border border-line bg-slate-100 p-1 text-xs font-medium sm:gap-2 sm:text-sm">
          <NavLink
            to={{ pathname: "/jobs", search: jobsSearch }}
            end
            className={({ isActive }) =>
              `rounded-full px-3 py-2 transition sm:px-4 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-slate-500 hover:text-slate-900"
              }`
            }
          >
            Việc làm
          </NavLink>
          <NavLink
            to={{ pathname: "/jobs/filter", search: jobsSearch }}
            className={({ isActive }) =>
              `rounded-full px-3 py-2 transition sm:px-4 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-slate-500 hover:text-slate-900"
              }`
            }
          >
            Bộ lọc
          </NavLink>
          <NavLink
            to="/saved-jobs"
            className={({ isActive }) =>
              `relative rounded-full px-3 py-2 transition sm:px-4 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-slate-500 hover:text-slate-900"
              }`
            }
          >
            Đã lưu
            {savedJobIds.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow">
                {savedJobIds.length > 99 ? "99+" : savedJobIds.length}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}