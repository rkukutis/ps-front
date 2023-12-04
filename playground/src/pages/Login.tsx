import { SubmitHandler, useForm } from "react-hook-form";
import login from "../services/login";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";

type Inputs = { username: string; password: string };

interface ErrorInput {
  message: string;
}

function ErrorLabel({ message }: ErrorInput) {
  return <span className="bg-red-100 w-full mt-2 p-1 text-red-500 text-center">{message}</span>;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const { updateUsername, updatePassword } = useUserStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res: boolean = await login({ username: data.username, password: data.password });
    if (res) {
      updateUsername(data.username);
      updatePassword(data.password);
      navigate("/home");
    } else {
      alert("Wrong user details!");
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center h-[75vh] justify-center">
      <form className="bg-slate-200 py-6 px-4 w-[30rem] flex flex-col space-y-4 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-1">
          <label>Username</label>
          <input className="w-full p-1" {...register("username", { required: true })} />
          {errors.username && <ErrorLabel message="username is required" />}
        </div>
        <div className="flex flex-col space-y-1">
          <label>Password</label>
          <input type="password" className="w-full p-1" {...register("password", { required: true })} />
          {errors.password && <ErrorLabel message="password is required" />}
        </div>
        <input className="bg-blue-500 py-1 w-full hover:curs rounded-md text-slate-100" type="submit"></input>
      </form>
    </div>
  );
}
