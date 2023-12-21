import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Button from "./Button";
import { useUserStore } from "../stores/tokenStore";

export default function PageLayout() {
  const navigate = useNavigate();
  const { token, setToken } = useUserStore();

  function logout() {
    setToken("");
  }

  return (
    <>
      <header className="py-9 bg-blue-400 flex justify-between px-4 items-center h-[10vh]">
        <NavigationBar />
        {token ? (
          <div className="flex items-center space-x-3">
            <Button onclick={logout}>Log out</Button>
          </div>
        ) : (
          <Button onclick={() => navigate("/login")}>Log in</Button>
        )}
      </header>
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <footer className="bg-slate-800 py-1 text-slate-100 flex flex-col items-center justify-center h-[5vh]">
        <p>😂 This site is built for learning purposes 😂</p>
      </footer>
    </>
  );
}
