import { getDocumentPathFromSlug } from "~/actions/get-document-path-from-slug";
import { renderDocumentByPath } from "~/actions/render-document-by-path";
import { Sidebar } from "./components/sidebar";
import { redirect } from "next/navigation";
import Preview from "./components/preview";

const Home = async () => {
  let emailPath: string;
  try {
    emailPath = await getDocumentPathFromSlug("AppStatic");
  } catch (exception) {
    if (exception instanceof Error) {
      console.warn(exception.message);
      redirect('/');
    }
    throw exception;
  }

  const emailRenderingResult = await renderDocumentByPath(emailPath);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-grow bg-background">
        <div className="grid lg:grid-cols-5 flex-grow">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l flex-grow">
            <Preview
              slug="AppStatic"
              documentPath={emailPath}
              renderingResult={emailRenderingResult}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

