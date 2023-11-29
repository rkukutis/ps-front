import { useState } from "react";
import getQuotes from "../services/getQuotes";

export default function List() {
  const [quote, setQuote] = useState("");

  async function handler() {
    const quote: string = await getQuotes();
    setQuote(quote);
  }

  return (
    <div className="py-2 my-2 w-[20rem] bg-slate-100 flex flex-col px-2 space-y-5 rounded-[15px]">
      <button className="p-5 bg-green-500 hover:bg-green-400 rounded-[15px]" onClick={handler}>
        Get a cat quote
      </button>
      <h1 className="text text-slate-900 text-center">{quote}</h1>
    </div>
  );
}
