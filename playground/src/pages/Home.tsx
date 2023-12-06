import cat from "../assets/cat.jpg";

export default function Home() {
  return (
    <section className=" bg-slate-200 min-h-[80vh] flex flex-col justify-center">
      <div className="flex items-center flex-col space-y-2">
        <h1>Welcome to my website!</h1>
        <h3>There's nothing here yet, but have a picture of this cute kitty :)</h3>
        <img className="w-[20rem] py-5" src={cat} />
        {/* <List /> */}
      </div>
    </section>
  );
}
