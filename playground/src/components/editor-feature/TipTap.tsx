// // import "./styles/tiptap-style.css";

// import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import Image from "@tiptap/extension-image";
// import Underline from "@tiptap/extension-underline";
// import { EditorProvider, useCurrentEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import MenuBar from "./MenuBar";
// import Button from "../Button";
// import createPost from "../../services/posts-api/createPost";

// const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   // TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     }
//   }),
//   Image.configure(),
//   Underline.configure()
// ];

// function ButtonWrapper({ children }: { children: string }) {
//   const { editor } = useCurrentEditor();

//   function handleClick() {
//     if (!editor) return;
//     createPost({ title: "EDITOR TESTING", body: editor.getHTML() });
//   }
//   return <Button onclick={handleClick}>{children}</Button>;
// }

// const content = `<p>Start here...</p>`;

// export default function TipTap({ initialBody }: { initialBody: string | undefined }) {
//   return (
//     <>
//       <EditorProvider
//         editorProps={{
//           attributes: {
//             class: "prose prose-sm sm:prose lg:prose-sm xl:prose-lg mx-auto focus:outline-none bg-slate-50 rounded-md p-2 text-sm min-h-[10rem]"
//           }
//         }}
//         slotBefore={<MenuBar />}
//         extensions={extensions}
//         content={initialBody || content}
//       >
//         <ButtonWrapper>Submit</ButtonWrapper>
//       </EditorProvider>
//     </>
//   );
// }
