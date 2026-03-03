module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
  plugins: ["react-refresh", "react-hooks", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-refresh/recommended",
    "prettier"
  ],
  settings: {
    react: { version: "detect" }
  },
  rules: {
    // Reasonable defaults; tailor as needed
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/no-autofocus": "error",
    "jsx-a11y/no-redundant-roles": "warn"
  },
  ignorePatterns: ["dist/", "coverage/"]
};