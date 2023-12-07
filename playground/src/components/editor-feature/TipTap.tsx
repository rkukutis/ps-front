// import "./styles/tiptap-style.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import Button from "../Button";
import createPost from "../../services/posts-api/createPost";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  }),
  Image.configure()
];

function ButtonWrapper({ children }: { children: string }) {
  const { editor } = useCurrentEditor();

  function handleClick() {
    if (!editor) return;
    createPost({ title: "EDITOR TESTING", body: editor.getHTML() });
  }

  return <Button onclick={handleClick}>{children}</Button>;
}

const content = `<h1>TESTING TEST</h1>`;

export default function TipTap() {
  return (
    <>
      <EditorProvider
        editorProps={{ attributes: { class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none" } }}
        slotAfter={<ButtonWrapper>Submit</ButtonWrapper>}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      >
        END
      </EditorProvider>
    </>
  );
}
