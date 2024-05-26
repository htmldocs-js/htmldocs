import { documentsDirectoryAbsolutePath } from "../utils/documents-directory-absolute-path";
import { Shell } from "./components/shell";
import path from "path";

const Home = async () => {
  const baseEmailsDirectoryName = path.basename(documentsDirectoryAbsolutePath);

  return (
    <Shell>
      <div className="relative max-w-lg mx-auto p-8 flex items-center justify-center h-[inherit]">
        <div className="relative z-10 flex flex-col text-center items-center">
          <h2 className="text-2xl font-bold">
            Welcome to htmldocs
          </h2>
          <p className="mt-2 mb-4">
            To start developing your emails, you can create a<br />
            <code className="text-slate-12">.jsx</code> or{' '}
            <code className="text-slate-12">.tsx</code> file under your{' '}
            <code className="text-slate-12">{baseEmailsDirectoryName}</code>{' '}
            folder.
          </p>
        </div>
      </div>
    </Shell>
  );
}

export default Home;

