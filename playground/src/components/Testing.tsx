import { useClickStore } from "../stores/ClickStore";
import Button from "./Button";

export default function Testing() {
  const { clicks, increaseClicks, decreaseClicks } = useClickStore();

  return (
    <div className="flex flex-col items-center">
      <h1>{clicks} Clicks</h1>
      <div className="flex flex-col items-center">
        <Button onclick={increaseClicks}>Increase</Button>
        <Button onclick={decreaseClicks}>Decrease</Button>
      </div>
    </div>
  );
}
