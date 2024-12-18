import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/script.ts",
  output: [
    {
      file: "dist/script.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/script.esm.js",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist/types",
      rootDir: "src",
    }),
  ],
};
