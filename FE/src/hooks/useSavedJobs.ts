import { useCallback, useEffect, useState } from "react";
import { getSavedJobs, saveJob, unsaveJob, isJobSaved } from "../lib/saved-jobs";

export function useSavedJobs() {
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => getSavedJobs());

  // Sync với storage events (tab khác thay đổi)
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === "savedJobs") {
        setSavedJobIds(getSavedJobs());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const save = useCallback((jobId: string) => {
    saveJob(jobId);
    setSavedJobIds(getSavedJobs());
  }, []);

  const unsave = useCallback((jobId: string) => {
    unsaveJob(jobId);
    setSavedJobIds(getSavedJobs());
  }, []);

  const toggle = useCallback((jobId: string) => {
    if (isJobSaved(jobId)) {
      unsaveJob(jobId);
    } else {
      saveJob(jobId);
    }
    setSavedJobIds(getSavedJobs());
  }, []);

  const isSaved = useCallback(
    (jobId: string) => savedJobIds.includes(jobId),
    [savedJobIds]
  );

  return { savedJobIds, save, unsave, toggle, isSaved };
}