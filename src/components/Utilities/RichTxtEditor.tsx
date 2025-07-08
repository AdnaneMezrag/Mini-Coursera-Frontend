import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Extension } from "@tiptap/core";
import DOMPurify from "dompurify";
import React from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Paintbrush,
  Type,
} from "lucide-react";

// 🧩 Inline FontSize Extension (no external file needed)
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) =>
              element.style.fontSize || null,
            renderHTML: (attributes: any) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
    };
  },
});

// 🔧 TypeScript hack: extend the chain type manually
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
    };
  }
}

// 📝 Component Props
interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

// ✅ Component
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Color, FontSize],
    content: value,
    onUpdate: ({ editor }) => {
      const dirtyHTML = editor.getHTML();
      const cleanHTML = DOMPurify.sanitize(dirtyHTML);
      onChange(cleanHTML);
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border border-gray-300 p-2 rounded-md bg-gray-50 items-center">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? active : button}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? active : button}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? active : button}
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        {/* Font Size Selector */}
        <div className="flex items-center gap-1">
          <Type className="w-4 h-4 text-gray-600" />
          <select
            onChange={(e) =>
              editor.chain().focus().setFontSize(e.target.value).run()
            }
            defaultValue=""
            className="text-sm border rounded px-1"
          >
            <option value="" disabled>
              Size
            </option>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="20px">20</option>
            <option value="24px">24</option>
            <option value="32px">32</option>
          </select>
        </div>

        {/* Font Color Picker */}
        <div className="flex items-center gap-1">
          <Paintbrush className="w-4 h-4 text-gray-600" />
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="w-6 h-6 border p-0"
          />
        </div>
      </div>

      {/* Content */}
      <div className="border border-gray-300 rounded-md p-2 min-h-[150px]">
        <EditorContent
          editor={editor}
          className="min-h-[150px] whitespace-pre-wrap"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

// 🔘 Styling
const button =
  "px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100";
const active =
  button + " bg-blue-100 border-blue-400 text-blue-700";
