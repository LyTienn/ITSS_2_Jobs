import { Outlet } from "react-router-dom";
import { SiteFooter } from "../components/layout/site-footer";
import { SiteHeader } from "../components/layout/site-header";

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-text">
      <SiteHeader />
      <main className="flex min-h-0 w-full flex-1 flex-col">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
