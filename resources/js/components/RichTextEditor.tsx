import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';

interface Props {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-lg">
            <div className="border-b p-2 flex flex-wrap gap-2 bg-gray-50">
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive('bold') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive('italic') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive('strike') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    Strike
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    H1
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    H2
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive('bulletList') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    Bullet List
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive('orderedList') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    Ordered List
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                >
                    Left
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                >
                    Center
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                >
                    Right
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                >
                    Justify
                </Button>
            </div>
            <div className="p-4 min-h-[400px] prose max-w-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
