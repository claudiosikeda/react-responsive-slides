import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    sourcemap: true
  },
  external: ['react', 'react-dom'],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    resolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs()
  ],
};
