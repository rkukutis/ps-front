import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Button from "./Button";
import { useUserStore } from "../stores/userStore";

export default function PageLayout() {
  const navigate = useNavigate();
  const { username, updateUsername, updatePassword } = useUserStore();

  function logout() {
    updateUsername("");
    updatePassword("");
  }

  return (
    <>
      <header className="py-9 bg-blue-400 flex justify-between px-4 items-center">
        <NavigationBar />
        {username ? (
          <div className="flex items-center space-x-3">
            <h3>{username}</h3>
            <Button onclick={logout}>Log out</Button>
          </div>
        ) : (
          <Button onclick={() => navigate("/login")}>Log in</Button>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-slate-800 py-9 text-slate-100 flex flex-col items-center">
        <p>😂 This site is built for learning purposes 😂</p>
      </footer>
    </>
  );
}
