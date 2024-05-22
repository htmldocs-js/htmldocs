import path from 'node:path';
import { promises as fs } from 'node:fs';
import type { Loader, PluginBuild, ResolveOptions } from 'esbuild';

/**
 * Made to export the `renderAsync` function out of the user's email template
 * so that issues like https://github.com/resend/react-email/issues/649 don't
 * happen.
 *
 * This avoids multiple versions of React being involved, i.e., the version
 * in the CLI vs. the version the user has on their document.
 */
export const renderResolver = (documentTemplates: string[]) => ({
  name: 'render-resolver',
  setup: (b: PluginBuild) => {
    b.onLoad(
      { filter: new RegExp(documentTemplates.join('|')) },
      async ({ path: pathToFile }) => {
        return {
          contents: `${await fs.readFile(pathToFile, 'utf8')};
          export { renderAsync } from 'htmldocs-module-that-will-export-render'
        `,
          loader: path.extname(pathToFile).slice(1) as Loader,
        };
      },
    );

    b.onResolve(
      { filter: /^htmldocs-module-that-will-export-render$/ },
      async (args) => {
        const options: ResolveOptions = {
          kind: 'import-statement',
          importer: args.importer,
          resolveDir: args.resolveDir,
          namespace: args.namespace,
        };
        let result = await b.resolve('@htmldocs/render', options);
        if (result.errors.length === 0) {
          return result;
        }

        if (result.errors.length > 0 && result.errors[0]) {
          result.errors[0].text =
            "Failed trying to import `renderAsync` from `@htmldocs/render` to be able to render your document template.\n Maybe you don't have `@htmldocs/render` installed?";
        }
        return result;
      },
    );
  },
});