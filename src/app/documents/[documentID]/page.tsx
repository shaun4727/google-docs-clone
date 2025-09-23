import EditorPage from './editor';
import { Navbar } from './navbar';
import Toolbar from './toolbar';

const DocumentIDPage = () => {
	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<div className="flex flex-col print:hidden px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD]">
				<Navbar />
				<Toolbar />
			</div>
			<EditorPage />
		</div>
	);
};

export default DocumentIDPage;
