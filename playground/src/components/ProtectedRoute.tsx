import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = localStorage.getItem("user");
  if (!user) return;
  const { state } = JSON.parse(user);

  return (
    <>
      {state.password ? (
        <Outlet />
      ) : (
        <h1 className=" bg-slate-50 flex flex-col justify-center items-center text-4xl h-[85vh]">
          🛑 Only logged in users can currently access the blog. 🛑
        </h1>
      )}
    </>
  );
}

export default ProtectedRoute;
