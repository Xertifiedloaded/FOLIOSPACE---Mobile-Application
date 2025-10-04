module.exports = {
  extends: ["expo", "plugin:import/recommended", "plugin:import/typescript"],
  settings: {
    "import/resolver": {
      typescript: {}, // this makes ESLint use tsconfig paths
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
  },
};
