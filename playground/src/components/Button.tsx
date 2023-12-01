interface ButtonProps {
  children: string;
  type?: string;
  onclick?: () => void;
}

const styles = {
  normal: "bg-blue-500 px-5 py-2 rounded-md text-slate-800 hover:bg-blue-300",
  danger: "bg-red-500 px-5 py-2 rounded-md text-slate-800 hover:bg-red-300"
};

export default function Button({ children, type = styles.normal, onclick }: ButtonProps) {
  let style: string = styles.normal;
  if (type === "danger") {
    style = styles.danger;
  }

  return (
    <button onClick={onclick} className={style}>
      {children}
    </button>
  );
}
