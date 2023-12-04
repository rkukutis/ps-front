interface ButtonProps {
  children: string;
  type?: string;
  extraStyle?: string;
  onclick?: () => void;
}

const styles = {
  normal: "bg-blue-500 px-5 py-2 rounded-md text-slate-100 hover:bg-blue-300",
  danger: "bg-red-500 px-5 py-2 rounded-md text-red-100 hover:bg-red-300"
};

export default function Button({
  children,
  type = styles.normal,
  onclick,
  extraStyle
}: ButtonProps) {
  let style: string = styles.normal;
  if (type === "danger") {
    style = styles.danger;
  }

  return (
    <button onClick={onclick} className={style + ` ${extraStyle}`}>
      {children}
    </button>
  );
}
