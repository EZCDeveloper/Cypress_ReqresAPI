/// <reference types = "cypress" />

const email = Cypress.env("email");
const password = Cypress.env("password");

describe("Register via API", () => {
  context("Succesfully Credentials", () => {
    it("TC_001_Validate Succesfull Register via API", () => {
      cy.visit("/");
      cy.request({
        method: "POST",
        url: "/api/register",
        body: {
          email: email,
          password: password,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("token");
      });
    });
  });

  context("Wrong Credentials", () => {
    it("TC_002_Validate Unsuccesfull Register via API", () => {
      cy.visit("/");
      cy.request({
        method: "POST",
        url: "/api/register",
        body: {
          email: "sydney@fife",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        // cy.log("Response: " + JSON.stringify(response));
        expect(response.body).to.have.property("error", "Missing password");
        cy.log("Note: Only defined users succeed registration");
      });
    });

    it("TC_003_Validate Unsuccesfull Register via API Missing Fields ", () => {
      cy.visit("/");
      cy.request({
        method: "POST",
        url: "/api/register",
        body: {
          email: "",
          password: "",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        // cy.log("Response: " + JSON.stringify(response));
        expect(response.body).to.have.property(
          "error",
          "Missing email or username"
        );
        cy.log("Note: Only defined users succeed registration");
      });
    });
  });
});
