'use client';

import { useEditorStore } from '@/store/use-editor-store';
import { Mark, mergeAttributes } from '@tiptap/core';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';

export const NoSpellcheck = Mark.create({
	name: 'nospellcheck',

	addAttributes() {
		return {
			spellcheck: {
				default: 'false',
				renderHTML: () => ({ spellcheck: 'false' }),
			},
		};
	},

	parseHTML() {
		return [{ tag: 'span[spellcheck="false"]' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['span', mergeAttributes(HTMLAttributes), 0];
	},
});

const EditorPage = () => {
	const { setEditor } = useEditorStore();
	const editor = useEditor({
		onCreate: ({ editor }) => {
			setEditor(editor);
		},
		onDestroy: () => {
			setEditor(null);
		},
		onUpdate: ({ editor }) => {
			setEditor(editor);
		},
		onSelectionUpdate: ({ editor }) => {
			setEditor(editor);
		},
		onTransaction: ({ editor }) => {
			setEditor(editor);
		},
		onFocus: ({ editor }) => {
			setEditor(editor);
		},
		onBlur: ({ editor }) => {
			setEditor(editor);
		},
		onContentError: ({ editor }) => {
			setEditor(editor);
		},

		editorProps: {
			attributes: {
				style: 'padding-left:56px; padding-right:56px',
				class: 'focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
			},
		},
		extensions: [
			StarterKit,
			NoSpellcheck,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
			}),
			Table,
			TableCell,
			TableHeader,
			FontFamily,
			TableRow,
			TextStyle,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
			Image,
			Underline,
			ImageResize,
			TaskItem.configure({
				nested: true,
			}),
			TaskList,
		],
		content: `<table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>`,
		// Don't render immediately on the server to avoid SSR issues
		immediatelyRender: false,
	});

	return (
		<div className="size-full overflow-x-auto flex justify-center bg-[#f9fbfd] px-4 print:p-0 print-bg-white print:overflow-visible">
			<div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 ">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default EditorPage;
