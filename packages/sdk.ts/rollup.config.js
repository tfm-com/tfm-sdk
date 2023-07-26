import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

const external = [
  "apisauce",
];

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" }), json(), babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      exclude: 'node_modules/**',
    }),],
    external,
  },
];
