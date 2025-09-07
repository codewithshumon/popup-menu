import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const external = ["react", "react-dom", "react/jsx-runtime"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/esm/index.js",
      format: "esm",
      sourcemap: true,
      exports: "named"
    },
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named"
    }
  ],
  external: (id) => external.includes(id) || id.startsWith("react/"),
  plugins: [
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      exclude: ["**/*.test.*", "**/*.stories.*"]
    }),
    postcss({
      // Extract CSS to a separate file
      extract: true,
      minimize: true,
      // Use CSS modules if needed, but in this case we want global styles
      modules: false,
      // Inject CSS into the bundle so it's automatically loaded
      inject: true,
      // This ensures CSS is included in the bundle
      sourceMap: true
    })
  ]
};