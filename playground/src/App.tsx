type ThingieProps = {
  thingies: string[];
};

const stuff: string[] = ["Hello", "There", "Heh"];

function App() {
  return (
    <>
      <h1 className="text text-red-600 text-center py-8 font-extrabold">
        BRUH
      </h1>
      <ThingieDisplay thingies={stuff} />
    </>
  );
}

function ThingieDisplay({ thingies }: ThingieProps) {
  return thingies.map((t) => <h2>{t}</h2>);
}

export default App;
