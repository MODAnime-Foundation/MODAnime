import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const prod = !process.env.ROLLUP_WATCH;

function serve() {
  let server;
  function toExit() {
    if (server) server.kill(0);
  }
  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );
      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/App.js',
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !prod,
      },
      preprocess: sveltePreprocess({
        sourceMap: false,
        postcss: {
          plugins: [
            require('@tailwindcss/jit'),
            require('postcss-preset-env')({
              stage: 1,
              autoprefixer: false,
            }),
            require('postcss-clean'),
          ],
        },
      }),
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    !prod && serve(),
    !prod && livereload('public'),
    prod && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
