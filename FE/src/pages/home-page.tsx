import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jobApi } from "../lib/api";
import type { Job } from "../types/job";

const fallbackJobs: Job[] = [
  {
    _id: "mock-frontend-intern",
    companyName: "JobFit Labs",
    title: "Frontend Developer Intern",
    jobType: "INTERNSHIP",
    description: "Xây dựng giao diện tìm việc hiện đại cho sinh viên và fresher.",
    requirements: "React, TypeScript, HTML, CSS.",
    location: "Ha Noi",
    workType: "HYBRID",
    salary: "4 - 7 triệu",
    deadline: "2026-12-31",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    _id: "mock-business-analyst",
    companyName: "Blue Ocean Tech",
    title: "Business Analyst Fresher",
    jobType: "FULL_TIME",
    description: "Phân tích yêu cầu sản phẩm và tối ưu quy trình làm việc.",
    requirements: "Giao tiếp tốt, tư duy logic, biết SQL là lợi thế.",
    location: "Ho Chi Minh",
    workType: "OFFLINE",
    salary: "10 - 14 triệu",
    deadline: "2026-12-31",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    _id: "mock-data-analyst",
    companyName: "NextStep Careers",
    title: "Junior Data Analyst",
    jobType: "FULL_TIME",
    description: "Phân tích dữ liệu tuyển dụng và xây dựng dashboard báo cáo.",
    requirements: "Excel, SQL, Power BI hoặc Python cơ bản.",
    location: "Remote",
    workType: "REMOTE",
    salary: "12 - 18 triệu",
    deadline: "2026-12-31",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
];

const benefits = [
  ["Tìm việc theo năng lực", "Kết nối cơ hội dựa trên kỹ năng, kinh nghiệm và mục tiêu nghề nghiệp của bạn."],
  ["Bộ lọc rõ ràng", "Thu hẹp kết quả theo địa điểm, mức lương, hình thức làm việc và loại hình công việc."],
  ["Tiết kiệm thời gian", "Giao diện tập trung vào tìm kiếm, so sánh và xem nhanh thông tin quan trọng."],
  ["Gợi ý phù hợp hơn", "Ưu tiên những công việc gần với nhu cầu của sinh viên, fresher và người tìm việc."],
] as const;

const steps = [
  "Nhập thông tin công việc mong muốn.",
  "Lọc và so sánh các công việc phù hợp.",
  "Xem chi tiết và ứng tuyển.",
];

function getJobTypeLabel(jobType: Job["jobType"]) {
  return {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    INTERNSHIP: "Internship",
  }[jobType];
}

function getWorkTypeLabel(workType: Job["workType"]) {
  return {
    OFFLINE: "Tại văn phòng",
    REMOTE: "Remote",
    HYBRID: "Hybrid",
  }[workType];
}

function buildJobsUrl(keyword: string, location: string) {
  const params = new URLSearchParams();
  const trimmedKeyword = keyword.trim();
  const trimmedLocation = location.trim();

  if (trimmedKeyword) params.set("keyword", trimmedKeyword);
  if (trimmedLocation) params.set("location", trimmedLocation);

  const query = params.toString();
  return query ? `/jobs?${query}` : "/jobs";
}

export function HomePage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>(fallbackJobs);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadFeaturedJobs() {
      setLoadingJobs(true);
      try {
        const response = await jobApi.getJobs(1, 3);
        if (isActive && response.data.length > 0) {
          setFeaturedJobs(response.data.slice(0, 3));
        }
      } catch {
        if (isActive) {
          setFeaturedJobs(fallbackJobs);
        }
      } finally {
        if (isActive) {
          setLoadingJobs(false);
        }
      }
    }

    loadFeaturedJobs();

    return () => {
      isActive = false;
    };
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(buildJobsUrl(keyword, location));
  }

  return (
    <div className="bg-surface">
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center rounded-full border border-primary-soft bg-blue-50 px-4 py-2 text-sm font-semibold text-primary">
              Nền tảng tìm việc dành cho sinh viên và fresher
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Tìm công việc phù hợp với bạn nhanh hơn cùng JobFit
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              JobFit giúp bạn tìm kiếm việc làm theo kỹ năng, kinh nghiệm, địa điểm và hình thức
              làm việc trong một trải nghiệm gọn gàng, dễ sử dụng và đáng tin cậy.
            </p>

            <form onSubmit={handleSearch} className="mt-8 rounded-2xl border border-line bg-white p-3 shadow-card">
              <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)_150px]">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-700">Tên công việc / kỹ năng</span>
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    className="h-12 rounded-xl border border-line bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                    placeholder="React, Marketing, Data..."
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-700">Địa điểm</span>
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="h-12 rounded-xl border border-line bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Ha Noi, HCM, Remote"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center self-end rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/jobs" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition hover:bg-blue-700">
                Khám phá việc làm
              </Link>
              <Link to="/jobs/filter" className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-6 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary">
                Mở bộ lọc
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-slate-950 p-4 shadow-card">
            <div className="rounded-xl bg-white p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-primary">JobFit Match</p>
                  <h2 className="text-xl font-bold text-slate-950">Việc làm gợi ý</h2>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  92% phù hợp
                </span>
              </div>
              <div className="space-y-3">
                {featuredJobs.map((job) => (
                  <div key={job._id} className="rounded-xl border border-line bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">{job.companyName}</p>
                        <h3 className="mt-1 text-base font-bold text-slate-950">{job.title}</h3>
                      </div>
                      <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">
                        {getWorkTypeLabel(job.workType)}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                      <span className="rounded-full bg-white px-3 py-1">{job.location}</span>
                      <span className="rounded-full bg-white px-3 py-1">{job.salary || "Thỏa thuận"}</span>
                      <span className="rounded-full bg-white px-3 py-1">{getJobTypeLabel(job.jobType)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8" id="benefits">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-normal text-primary">Lợi ích</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Tìm việc có định hướng, không bị rối</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, description], index) => (
              <article key={title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white px-4 py-12 sm:px-6 lg:px-8" id="featured-jobs">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-primary">Việc làm nổi bật</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Cơ hội đang tuyển phù hợp để bắt đầu</h2>
            </div>
            <Link to="/jobs" className="text-sm font-bold text-primary hover:text-blue-700">
              Xem tất cả việc làm
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {(loadingJobs ? fallbackJobs : featuredJobs).map((job) => (
              <article key={job._id} className="flex min-h-[300px] flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-500">{job.companyName}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{job.title}</h3>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    <p>{job.location}</p>
                    <p>{job.salary || "Thỏa thuận"}</p>
                    <p>{getWorkTypeLabel(job.workType)} - {getJobTypeLabel(job.jobType)}</p>
                  </div>
                </div>
                <Link
                  to={job._id.startsWith("mock-") ? "/jobs" : `/jobs/${job._id}`}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Xem chi tiết
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8" id="about">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-primary">Cách hoạt động</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Từ tìm kiếm đến ứng tuyển trong 3 bước</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              JobFit tập trung vào hành trình tìm việc thực tế: nhập nhu cầu, lọc kết quả,
              xem thông tin rõ ràng và chuyển tới ứng tuyển.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="text-sm font-bold text-primary">Bước {index + 1}</span>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-900">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-slate-950 px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-3xl font-bold">Sẵn sàng tìm công việc phù hợp?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Bắt đầu với từ khóa, địa điểm hoặc bộ lọc nâng cao để JobFit đưa bạn đến những cơ hội tốt hơn.
          </p>
          <Link to="/jobs" className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-slate-950 transition hover:bg-blue-50">
            Bắt đầu tìm việc
          </Link>
        </div>
      </section>
    </div>
  );
}
