import { useCurrentEditor } from "@tiptap/react";
import { useCallback } from "react";

export default function MenuBar() {
  const { editor } = useCurrentEditor();
  type Level = 1 | 2 | 3 | 4 | 5 | 6;

  const baseStyle = "p-5 bg-slate-100 rounded-md border-2 border-slate-200";
  const selectedStyle = "p-5 bg-blue-500 rounded-md border-2 border-blue-600";

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  function setHeaderLevel(value: Level) {
    if (!editor) return;
    editor.chain().focus().setHeading({ level: value }).run();
  }

  return (
    <div className="flex flex-wrap items-center justify-center space-x-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? selectedStyle : baseStyle}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? selectedStyle : baseStyle}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? selectedStyle : baseStyle}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? selectedStyle : baseStyle}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive("paragraph") ? selectedStyle : baseStyle}>
        paragraph
      </button>
      {/* /// HEADERS */}
      <select onChange={(e) => setHeaderLevel(Number(e.target.value))}>
        <option value={1}>Header 1</option>
        <option value={2}>Header 2</option>
        <option value={3}>Header 3</option>
        <option value={4}>Header 4</option>
        <option value={5}>Header 5</option>
        <option value={6}>Header 6</option>
      </select>
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? selectedStyle : baseStyle}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? selectedStyle : baseStyle}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? selectedStyle : baseStyle}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? selectedStyle : baseStyle}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? selectedStyle : baseStyle}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? selectedStyle : baseStyle}
      >
        h6
      </button> */}
      {/* ///HEADERS */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? selectedStyle : baseStyle}>
        bullet list
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? selectedStyle : baseStyle}>
        ordered list
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? selectedStyle : baseStyle}>
        code block
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? selectedStyle : baseStyle}>
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>horizontal rule</button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button>
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
        undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""}
      >
        purple
      </button>
      <button onClick={addImage}>Add image</button>
    </div>
  );
}
