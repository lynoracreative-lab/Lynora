"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export function RichTextEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Write the story..." }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: "min-h-64 px-4 py-3 text-sm leading-7 text-ivory outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && defaultValue && editor.isEmpty) {
      editor.commands.setContent(defaultValue);
    }
  }, [defaultValue, editor]);

  function addLink() {
    const url = window.prompt("Link URL");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = window.prompt("Image URL (upload via Media first, then paste the URL)");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }

  function addVideo() {
    const url = window.prompt("YouTube or Vimeo URL");
    if (!url || !editor) return;
    const embed = url.includes("vimeo")
      ? url.replace("vimeo.com/", "player.vimeo.com/video/")
      : url.replace("watch?v=", "embed/");
    editor.chain().focus().insertContent(`<iframe src="${embed}"></iframe>`).run();
  }

  return (
    <div className="overflow-hidden rounded-[18px] border border-gold/15 bg-ink">
      <input type="hidden" name={name} value={editor?.getHTML() || defaultValue} />
      <div className="flex flex-wrap gap-2 border-b border-gold/10 px-3 py-2 text-xs text-stone">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()}>Underline</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>Bullets</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()}>Numbers</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Quote</button>
        <button type="button" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>Line</button>
        <button type="button" onClick={addLink}>Link</button>
        <button type="button" onClick={addImage}>Image</button>
        <button type="button" onClick={addVideo}>Video</button>
        <button type="button" onClick={() => editor?.chain().focus().undo().run()}>Undo</button>
        <button type="button" onClick={() => editor?.chain().focus().redo().run()}>Redo</button>
        <button
          type="button"
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .insertContent('<div class="cta-block"><a href="/contact">Start a Project</a></div>')
              .run()
          }
        >
          Button
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
