/// <reference types = "cypress" />

describe("Get a Single List of a User via API", () => {
  it("TC_001_Validate get Single List via API", () => {
    cy.visit("/");
    cy.request({
      method: "GET",
      url: "/api/users/2",
      failOnStatusCode: false,
    }).then((response) => {
      // cy.log("Response: " + JSON.stringify(response));
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body).to.have.property("support");
      expect(response.body.data).to.have.property("id", 2);
      expect(response.body.data).to.have.property(
        "email",
        "janet.weaver@reqres.in"
      );
      expect(response.body.data).to.have.property("first_name", "Janet");
      expect(response.body.data).to.have.property("last_name", "Weaver");
      expect(response.body.data).to.have.property(
        "avatar",
        "https://reqres.in/img/faces/2-image.jpg"
      );
    });
  });

  it("TC_001_Validate Invalid user id with Single List via API", () => {
    cy.visit("/");
    cy.request({
      method: "GET",
      url: "/api/users/23",
      failOnStatusCode: false,
    }).then((response) => {
      // cy.log("Response: " + JSON.stringify(response));
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});
