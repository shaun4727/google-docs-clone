import { PaginationStatus } from 'convex/react';
import { LoaderIcon } from 'lucide-react';
import { Doc } from '../../../convex/_generated/dataModel';
// import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table";

interface DocumentsTableProps {
	documents: Doc<'documents'>[] | undefined;
	loadMore: (numItems: number) => void;
	status: PaginationStatus;
}

export const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
	return (
		<div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
			{documents === undefined ? (
				<div className="flex justify-center items-center h-24">
					{' '}
					<LoaderIcon className="animate-spin text-muted-foreground sized-5" />{' '}
				</div>
			) : (
				<div>Loaded.</div>
			)}
		</div>
	);
};
