import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "../pages/home-page";
import { JobDetailPage } from "../pages/job-detail-page";
import { JobFilterPage } from "../pages/job-filter-page";
import { JobsPage } from "../pages/jobs-page";
import { SavedJobsPage } from "../pages/savedJobs-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "jobs", element: <JobsPage /> },
      { path: "jobs/filter", element: <JobFilterPage /> },
      { path: "jobs/:id", element: <JobDetailPage /> },
      { path: "saved-jobs", element: <SavedJobsPage /> },
    ],
  },
]);
