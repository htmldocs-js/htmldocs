import esbuild from 'esbuild';
import inlineImportPlugin from 'esbuild-plugin-inline-import';

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  sourcemap: true,
  platform: 'node',
  external: ['react', 'react-dom'],
  plugins: [
    inlineImportPlugin({
      filter: /^(.*)\.css$/,
    }),
  ],
}).catch(() => process.exit(1));
