import * as esbuild from 'esbuild';
import templatejs from 'esbuild-plugin-templatejs';

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: './dist/index.js',
  plugins: [templatejs()],
});
