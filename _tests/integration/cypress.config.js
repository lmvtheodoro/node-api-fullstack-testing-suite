const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/_tests/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 15000,
    env: {
      local: {
        baseUrl: 'http://localhost:3000'
      },
      dev: {
        baseUrl: 'http://dev.api'
      },
      qa: {
        baseUrl: 'http://qa.api'
      }
    }
  },
});