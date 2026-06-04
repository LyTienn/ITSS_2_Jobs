import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobCard } from "../components/jobs/job-card";
import { Pagination } from "../components/jobs/pagination";
import { Panel, SectionTitle } from "../components/jobs/ui";
import { jobApi } from "../lib/api";
import { useSavedJobs } from "../hooks/useSavedJobs";
import type { Job } from "../types/job";

const PAGE_SIZE = 10;

export function SavedJobsPage() {
  const { savedJobIds } = useSavedJobs();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(savedJobIds.length / PAGE_SIZE);
  const pageIds = savedJobIds.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    if (pageIds.length === 0) {
      setJobs([]);
      return;
    }

    const fetchSavedJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          pageIds.map((id) => jobApi.getJobById(id).then((res) => res.data))
        );
        setJobs(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không thể tải công việc đã lưu");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [pageIds.join(",")]);

  // Reset về trang 1 khi unsave job
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [savedJobIds.length, totalPages, currentPage]);

  return (
    <div className="flex min-h-[calc(100dvh-80px)] flex-1 flex-col">
      {/* Header */}
      <div className="shrink-0 bg-white px-4 sm:px-6 lg:px-8 py-4 border-b border-line">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="Công việc đã lưu"
            subtitle="Danh sách các công việc bạn đã lưu lại."
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-3xl flex flex-col gap-4">
          {/* Status bar */}
          <Panel className="p-5">
            <p className="text-lg font-semibold text-slate-900">
              {savedJobIds.length} công việc đã lưu
            </p>
          </Panel>

          {/* Error */}
          {error && (
            <Panel className="border border-red-200 bg-red-50 p-5 text-center">
              <p className="text-sm text-red-600">Lỗi: {error}</p>
            </Panel>
          )}

          {/* Loading */}
          {loading ? (
            <Panel className="p-8 text-center">
              <p className="text-slate-500">Đang tải...</p>
            </Panel>
          ) : savedJobIds.length === 0 ? (
            /* Empty state */
            <Panel className="p-12 text-center">
              <div className="text-4xl mb-4">🔖</div>
              <h3 className="text-lg font-semibold text-slate-900">Chưa có công việc nào được lưu</h3>
              <p className="mt-2 text-sm text-slate-500">
                Bấm "Lưu công việc" để lưu lại.
              </p>
              <Link
                to="/jobs"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Tìm việc ngay
              </Link>
            </Panel>
          ) : (
            /* Job list */
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-line pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}