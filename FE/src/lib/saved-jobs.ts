const STORAGE_KEY = "savedJobs";
 
type SavedJobsData = {
  savedJobs: string[];
  lastUpdated: string;
};
 
function readStorage(): SavedJobsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { savedJobs: [], lastUpdated: new Date().toISOString() };
    return JSON.parse(raw) as SavedJobsData;
  } catch {
    return { savedJobs: [], lastUpdated: new Date().toISOString() };
  }
}
 
function writeStorage(data: SavedJobsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable
  }
}
 
export function getSavedJobs(): string[] {
  return readStorage().savedJobs;
}
 
export function saveJob(jobId: string) {
  const data = readStorage();
  if (!data.savedJobs.includes(jobId)) {
    data.savedJobs.push(jobId);
    data.lastUpdated = new Date().toISOString();
    writeStorage(data);
  }
}
 
export function unsaveJob(jobId: string) {
  const data = readStorage();
  data.savedJobs = data.savedJobs.filter((id) => id !== jobId);
  data.lastUpdated = new Date().toISOString();
  writeStorage(data);
}
 
export function isJobSaved(jobId: string): boolean {
  return readStorage().savedJobs.includes(jobId);
}