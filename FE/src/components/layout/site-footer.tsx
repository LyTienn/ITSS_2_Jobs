import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-line bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold text-primary">
            JobFit
          </Link>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Nền tảng tìm kiếm việc làm giúp người dùng kết nối với công việc phù hợp hơn.
          </p>
        </div>
        <p className="text-sm text-slate-500">Copyright 2026 JobFit. All rights reserved.</p>
      </div>
    </footer>
  );
}
