const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://reqres.in/",
    env: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
