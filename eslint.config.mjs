import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
    {languageOptions: {
        globals: {...globals.browser, ...globals.node}
    }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {rules: {
        "semi": ["error", "always"],  // Require semi-colon
        "quotes": ["error", "double"],  // Require double quotes
        "eqeqeq": ["error", "always"],  // Require === or !== and prohibit ==
        "indent": ["error", 4],  // Require specified spaces of tab
        "no-unused-vars": "warn",  // Warning of unused var
        "eol-last": ["error", "always"],  // Require last clear line
        "no-trailing-spaces": "error",  // Warning of white spaces
        "no-extra-parens": ["error", "functions"],  // Warning of unnecessary parens
        "react/react-in-jsx-scope": "off",  // Desactivate in react 16 or earlier
        // "no-console": "error"  // Warn of console.log to production
    }
    }
];
