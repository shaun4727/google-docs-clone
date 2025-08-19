'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
	BoldIcon,
	ChevronDownIcon,
	ItalicIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
} from 'lucide-react';

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: Boolean;
	icon: LucideIcon;
}

const FontFamilyButton = () => {
	const { editor } = useEditorStore();

	const fonts = [
		{ label: 'Arial', value: 'Arial' },
		{ label: 'Times New Roman', value: 'Times New Roman' },
		{ label: 'Courier New', value: 'Courier New' },
		{ label: 'Georgia', value: 'Georgia' },
		{ label: 'Verdana', value: 'Verdana' },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<span className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="truncate">{editor?.getAttributes('textStyle').fontFamily || 'Arial'}</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value }) => (
					<button
						key={value}
						onClick={() => editor?.chain().focus().setFontFamily(value).run()}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80',
						)}
						style={{ fontFamily: value }}
					>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'text-sm h-7 min-h-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
				isActive && 'bg-neutral-200/80',
			)}
		>
			<Icon />
		</button>
	);
};

const Toolbar = () => {
	const { editor } = useEditorStore();

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: 'Undo',
				icon: Undo2Icon,
				onClick: () => editor?.chain()?.focus()?.undo()?.run(),
			},
			{
				label: 'Redo',
				icon: Redo2Icon,
				onClick: () => editor?.chain()?.focus()?.redo()?.run(),
			},
			{
				label: 'Print',
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			{
				label: 'Ignore Word',
				icon: SpellCheckIcon,
				onClick: () => {
					if (!editor) return;

					const state = editor.state;
					const view = editor.view;
					const { from, to } = state.selection;

					if (from === to) {
						const $pos = state.doc.resolve(from);
						const start = $pos.start();
						const end = $pos.end();

						let wordStart = from;
						let wordEnd = to;

						while (wordStart > start && /\w/.test(state.doc.textBetween(wordStart - 1, wordStart))) {
							wordStart--;
						}
						while (wordEnd < end && /\w/.test(state.doc.textBetween(wordEnd, wordEnd + 1))) {
							wordEnd++;
						}

						editor
							.chain()
							.focus()
							.setTextSelection({ from: wordStart, to: wordEnd })
							.setMark('nospellcheck')
							.run();
					} else {
						editor.chain().focus().setMark('nospellcheck').run();
					}
				},
			},
		],
		[
			{
				label: 'Bold',
				icon: BoldIcon,
				isActive: editor?.isActive('bold'),
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				label: 'Italic',
				icon: ItalicIcon,
				isActive: editor?.isActive('italic'),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: 'Underline',
				icon: UnderlineIcon,
				isActive: editor?.isActive('underline'),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: 'Comment',
				icon: MessageSquarePlusIcon,
				onClick: () => console.log('underline'),
				isActive: false,
			},
			{
				label: 'List Todo',
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive('taskList'),
			},
			{
				label: 'Remove Formatting',
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];
	return (
		<div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			{/* TODO: Font Family */}
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Heading */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Font Size */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Link */}
			{/* TODO: Image */}
			{/* TODO: Align */}
			{/* TODO: Line Height */}
			{/* TODO: List */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
};

export default Toolbar;
