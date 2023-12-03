import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Button from "./Button";

export default function PageLayout() {
  const navigate = useNavigate();

  return (
    <>
      <header className="py-9 bg-blue-400 flex justify-between px-4 items-center">
        <NavigationBar />
        <Button onclick={() => navigate("/not-implemented")}>Log in</Button>
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer className="bg-slate-800 py-9 text-slate-100 flex flex-col items-center">
        <p>😂 This site is built for learning purposes 😂</p>
      </footer>
    </>
  );
}
