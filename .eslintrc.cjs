module.exports = {
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
  },
};
