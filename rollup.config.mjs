import externals from 'rollup-plugin-node-externals';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json' assert { type: 'json' };

const config = {
  input: 'src/confetti/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    externals(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: ['src/index.tsx', 'src/example.tsx', '**/setupTests.ts', '**/*.spec.tsx', '**/*.spec.ts'],
      },
    }),
    json(),
  ],
};

export default config;
