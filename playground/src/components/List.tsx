/*
import getQuotes from "../services/getQuotes";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function List() {
  const queryClient = useQueryClient();

  async function handler() {
    queryClient.invalidateQueries();
  }
  const { data } = useQuery({ queryKey: ["fact"], queryFn: getQuotes });

  return (
    <div className="py-2 my-2 w-[20rem] bg-slate-100 flex flex-col px-2 space-y-5 rounded-[15px]">
      <button className="p-5 bg-green-500 hover:bg-green-400 rounded-[15px]" onClick={handler}>
        Get a cat quote
      </button>
      <h1 className="text text-slate-900 text-center">{data}</h1>
    </div>
  );
}
*/
