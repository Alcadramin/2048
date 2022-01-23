module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "prettier"],
  rules: {
    "no-unused-vars": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/no-unused-components":
      process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-v-model-argument": "off",
  },
};
