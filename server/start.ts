// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
// @ts-ignore
require('@babel/register')({
  presets: ['@babel/typescript', '@babel/preset-env'],
  // Setting this will remove the currently hooked extensions of `.es6`, `.es`, `.jsx`, `.mjs`
  // and .js so you'll have to add them back if you want them to be used again.
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
  plugins: ['transform-class-properties', '@babel/transform-runtime'],
});

// Import the rest of our application.
module.exports = require('./index.ts');
