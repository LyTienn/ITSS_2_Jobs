import { NavLink, useLocation } from "react-router-dom";
import { useSavedJobs } from "../../hooks/useSavedJobs";

export function SiteHeader() {
  const location = useLocation();
  const shouldKeepJobsSearch = location.pathname === "/jobs" || location.pathname === "/jobs/filter";
  const jobsSearch = shouldKeepJobsSearch ? location.search : "";
  const { savedJobIds } = useSavedJobs();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `shrink-0 rounded-full px-3 py-2 transition sm:px-4 ${
      isActive ? "bg-primary text-white shadow-sm" : "bg-white text-slate-500 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-line/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:py-0 lg:px-8">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
          JobFit
        </NavLink>

        <nav className="flex w-full items-center gap-1 overflow-x-auto rounded-full border border-line bg-slate-100 p-1 text-xs font-medium sm:gap-2 sm:text-sm md:w-auto">
          <NavLink to="/" end className={navLinkClass}>
            Trang chủ
          </NavLink>
          <NavLink to={{ pathname: "/jobs", search: jobsSearch }} end className={navLinkClass}>
            Việc làm
          </NavLink>
          <NavLink to={{ pathname: "/jobs/filter", search: jobsSearch }} className={navLinkClass}>
            Bộ lọc
          </NavLink>
          <NavLink
            to="/saved-jobs"
            className={({ isActive }) =>
              `relative shrink-0 rounded-full px-3 py-2 transition sm:px-4 ${
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

        <NavLink
          to="/jobs"
          className="hidden h-11 shrink-0 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-blue-700 lg:inline-flex"
        >
          Tìm việc ngay
        </NavLink>
      </div>
    </header>
  );
}
