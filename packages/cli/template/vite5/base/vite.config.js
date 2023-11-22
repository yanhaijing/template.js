import { defineConfig } from 'vite';
import template from 'rollup-plugin-templatejs';

export default defineConfig({
  plugins: [
    {
      ...template(),
      enforce: 'pre',
    },
  ],
});
