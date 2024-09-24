import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  plugins: {
    tailwindcss: { config: path.resolve(__dirname, 'tailwind.config.mjs') },
    autoprefixer: {},
  },
}